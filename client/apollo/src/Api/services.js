import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';//TODO set this as an environment variable

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${BACKEND_URL}/api/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Refresh token error', err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const register = (firstName, lastName, username, password, phoneNumber) => {
  return axios.post(`${BACKEND_URL}/users/signup/`, {
    "first_name": firstName,
    "last_name": lastName,
    "username": username,
    "password": password,
    "phone_number": phoneNumber
  });
};

export const login = (username, password) => {
  return axios.post(`${BACKEND_URL}/users/login/`, {
    "username": username,
    "password": password,
  });
};

export const addTeacher = (firstName, lastName, phone, tscNumber, email) => {
  return axiosInstance.post("/staff/add_teacher/", {
    "first_name": firstName,
    "last_name": lastName,
    "phone_number": phone,
    "tsc_number": tscNumber,
    "email": email,
    "role": "teacher"
  });
};

export const getTeachers = () => {
  return axiosInstance.get("/staff/get_teachers/");
};

export const addStudent = (firstName, lastName, dateOfBirth, _class, gender, parentDetails) => {
  return axiosInstance.post("/students/add_student/", {
    "first_name": firstName,
    "last_name": lastName,
    "date_of_birth": dateOfBirth,
    "_class": _class,
    "gender": gender,
    "parent": {
      "first_name": parentDetails.firstName,
      "last_name": parentDetails.lastName,
      "email": parentDetails.email,
      "phone_number": parentDetails.phoneNumber,
    }
  });
};

export const getStudents = (_class) => {
  return axiosInstance.get(`students/get_students/${_class}/`)
}
