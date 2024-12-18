import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_SECRET_KEY = import.meta.env.VITE_CLOUDINARY_SECRET_KEY;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
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
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${BACKEND_URL}/api/token/refresh/`, { refresh: refreshToken });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        if (err.response.data.code === 'token_not_valid') {
          throw new Error(err.response.data.code)
        }
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
  return axiosInstance.get(`/classes/?school=${schoolId}`);
}

export const getClassCount = (schoolId) => {
  return axiosInstance.get(`/classes/?school=${schoolId}&count=true`)
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
  return axiosInstance.get(`/grades/subjects/?school_id=${schoolId}`);
}

export const getSubject = (subjectId) => {
  return axiosInstance.get(`/grades/subjects/${subjectId}/`);
}

export const addSubject = (name, code, description, classes, schoolId) => {
  return axiosInstance.post(`/grades/subjects/`, {
    "name": name,
    "code": code,
    "description": description,
    "classes": classes,
    "school": schoolId
  })
}

export const deleteSubject = (subjectId) => {
  return axiosInstance.delete(`/grades/subjects/${subjectId}/`);
}

export const patchSubject = (subjectId, name, code, description) => {
  return axiosInstance.patch(`/grades/subjects/${subjectId}/`,{
    "name": name,
    "code": code,
    "description": description,
  });
}

export const createGrade = (name, code, comments, schoolId) => {
  return axiosInstance.post(`/grades/grades/`,
    {
      "name": name,
      "code": code,
      "comments": comments,
      "school": schoolId
    });
}
export const updateGrade = (gradeId, name, code, comments) => {
  return axiosInstance.patch(`/grades/grades/${gradeId}/`,
    {
      "name": name,
      "code": code,
      "comments": comments,
    });
}

export const deleteGrade = (gradeId) => {
  return axiosInstance.delete(`/grades/grades/${gradeId}/`)
}

export const getGrades = (schoolId) => {
  return axiosInstance.get(`/grades/grades/?school=${schoolId}`);
}

export const getSubjectGrades = (subjectId) => {
  return axiosInstance.get(`/grades/subject_grades/?subject=${subjectId}`);
}

export const updateSubjectGrades = (subjectGrades) => {
  return axiosInstance.patch(`/grades/subject_grades/batch_update/ `, { "updates": subjectGrades });
}

export const deleteAcademicYear= (academicYearId) => {
  return axiosInstance.delete(`/fees/academic_years/${academicYearId}/`);
}

export const getAcademicYears = (schoolId) => {
  return axiosInstance.get(`/fees/academic_years/?school_id=${schoolId}`)
}

export const addAcademicYear = (name, startDate, endDate, schoolId) => {
  return axiosInstance.post(`/fees/academic_years/`, {
    "name": name,
    "start_date": startDate,
    "end_date": endDate,
    "school": schoolId
  });
};

export const createClass = (name, schoolId) => {
  return axiosInstance.post(`/classes/?school=${schoolId}`, {
    "name": name,
  });
};

export const deleteClass = (classId) => {
  return axiosInstance.delete(`/classes/${classId}`);
}

export const updateClass = (classId, field, value) => {
  return axiosInstance.patch(`/classes/${classId}/`, {
    [field]: value
  });
}

export const getTerms= (schoolId=null, academicYearId) => {
  if (schoolId) {
    return axiosInstance.get(`fees/terms/?school=${schoolId}`)
  } else {
    return axiosInstance.get(`/fees/terms/?academic_year=${academicYearId}`)
  }
}

export const createTerm = (name, startDate, endDate) => {
  return axiosInstance.post(`/`)
}

export const getExams = (schoolId) => {
  return axiosInstance.get(`/grades/exams/?school=${schoolId}`)
}

export const createExam = (name, startDate, endDate, schoolId) => {
  return axiosInstance.post(`/grades/exams/`, {
    "name": name,
    "start_date": startDate,
    "end_date": endDate,
    "school": schoolId
  })
}

export const updateExam = (examId, name, startDate, endDate) => {
  return axiosInstance.patch(`/grades/exams/${examId}/`, {
    "name": name,
    "start_date": startDate,
    "end_date": endDate
  });
}

export const deleteExam = (examId) => {
  return axiosInstance.delete(`/grades/exams/${examId}/`)
}

export const getStudentsWithScores = (examId) => {
  return axiosInstance.get(`/students/students_with_grades/?exam=${examId}`)
}

export const createOrUpdateStudentGrades = (student, exam, subjectMarks) => {
  return axiosInstance.post(`/grades/student_subject_grades/`,
    {
      "student": student,
      "exam": exam,
      "subject_marks": subjectMarks
    })
}

export const sendMessage = (schoolId, classes, content) => {
  return axiosInstance.post(`/messages/`,
    {
      "classes": classes,
      "content": content,
      "school": schoolId,
    }
  )
}

export const getMessages = (schoolId) => {
  return axiosInstance.get(`/messages/?school=${schoolId}`)
}
