import axios from 'axios';

//const BACKEND_URL = 'http://localhost:8000';//TODO set this as an environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_SECRET_KEY = import.meta.env.VITE_CLOUDINARY_SECRET_KEY;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

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

export const registerInstitution = (
  name,
  postalCode,
  county,
  phone,
  email,
  year,
  description,
  type,
  website,
  logo,
  documents,
  firstName,
  lastName,
  adminEmail,
  adminPhone,
  password
) => {
  return axios.post(`${BACKEND_URL}/schools/register_school/`, {
    "school":
    {
      "name": name,
      "postal_code": postalCode,
      "county": county,
      "phone_number": phone,
      "email": email,
      "year_established": year,
      "type": type,
      "website": website,
      "logo": "logourl",
      "documents": "documentsurl",
    },
    "admin":
    {
      "first_name": firstName,
      "last_name": lastName,
      "email": adminEmail,
      "phone_number": adminPhone,
      "password": password
    }
  });
};

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

export const addTeacher = (firstName, lastName, phone, tscNumber, email, schoolId, profilePhotoUrl) => {
  return axiosInstance.post("/staff/teachers/", {
    "first_name": firstName,
    "last_name": lastName,
    "phone_number": phone,
    "tsc_number": tscNumber,
    "email": email,
    "role": "teacher",
    "school": schoolId,
		"profile_photo": profilePhotoUrl
  });
};

export const getTeachers = (schoolId) => {
  return axiosInstance.get(`/schools/${schoolId}/teachers`);
};

export const addStudent = (firstName, lastName, dateOfBirth, gender, parentDetails, classId, profilePhotoUrl) => {
  return axiosInstance.post(`/classes/${classId}/add_student`, {
    "first_name": firstName,
    "last_name": lastName,
    "date_of_birth": dateOfBirth,
    "gender": gender,
		"profile_photo": profilePhotoUrl,
    "parent": {
      "first_name": parentDetails.firstName,
      "last_name": parentDetails.lastName,
      "email": parentDetails.email,
      "phone_number": parentDetails.phoneNumber,
    }
  });
};

export const getUserDetails = () => {
  return axiosInstance.get("/users/user/")
}

export const getStudents = (_class, schoolId) => {
  return axiosInstance.get(`students/get_students/${_class}/${schoolId}/`)
}

export const getClasses = (schoolId) => {
  return axiosInstance.get(`/schools/${schoolId}/classes`);
}

export const getStudentCount = (schoolId) => {
  return axiosInstance.get(`/students/count/?school_id=${schoolId}`);
}

export const getTeacherCount = (schoolId) => {
  return axiosInstance.get(`/staff/count/?school_id=${schoolId}`);
}

export const uploadProfilePhoto = (file) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
	return axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData
	);
}

export const getSubjects = (schoolId) => {
  return axiosInstance.get(`/grades/subjects/?school_id=${schoolId}`)
}

export const AddSubject = (name, code, description, schoolId) => {
  return axiosInstance.post(`/grades/subjects/`, {
    "name": name,
    "code": code,
    "description": description,
    "school": schoolId
  })
}

export const DeleteSubject = (subjectId) => {
  return axiosInstance.delete(`/grades/subjects/${subjectId}/`)
}