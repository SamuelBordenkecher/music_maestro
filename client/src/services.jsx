import axios from "axios"

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser?.token) {
    api.defaults.headers.common["Authorization"] = `Token ${storedUser.token}`;
}


export const signUp = async(userObj) => {
    let response = await api.post("users/signup/", userObj)
    if (response.status === 201) {
        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Token ${user.token}`
        return user;
    }
    alert(response.data)
}

export const logIn = async (userCred) => {
    let response = await api.post("users/login/", userCred);
    if (response.status === 200) {
        let user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Token ${user.token}`;
        return user;
    }
    alert(response.data)
    return null
}


export const logOut = async () => {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
        localStorage.removeItem("user");
        delete api.defaults.headers.common["Authorization"];
        return null;
    }
    alert("Unable to logout")
}

export const getAllTeachers = async () => {
    try {
        const response = await api.get("teachers/");
        return response.data;
    } catch (err) {
        console.log("Error fetching Teachers");
        return [];
    }
}

export const getTeacherByID = async (id) => {
    try {
        const response = await api.get(`teachers/${id}/`);
        return response.data;
    } catch (err) {
        console.log(`Error fetching Teacher ${id}`);
        return null;
    }
}

export const getStudentByID = async (id) => {
    try {
        const response = await api.get(`students/${id}/`);
        return response.data;
    } catch (err) {
        console.log(`Error fetching Teacher ${id}`);
        return null;
    }
}

export const updateTeacherProfile = async (teacherData) => {
    try {
        const response = await api.put("/teachers/myprofile/", teacherData);
        return response.data;
    } catch (err) {
        console.error("Error updating teacher profile:", err);
        throw err;
    }
};


export const updateStudentProfile = async (studentData) => {
    try {
        const response = await api.put("/students/myprofile/", studentData);
        return response.data;
    } catch (err) {
        console.error("Error updating student profile:", err);
        throw err;
    }
};

export const deleteUser = async () => {
    try {
        const response = await api.delete("/users/delete/");
        return response.data;
    } catch (err) {
        console.error("Error deleting user:", err);
        throw err;
    }
};


export const getAllInstruments = async () => {
    try {
        const response = await api.get("/instruments/");
        return response.data;
    } catch (err) {
        console.error("Error fetching instruments:", err);
        throw err;
    }
};



// ----------------- Teacher Lessons -----------------


// Create a new lesson (teacher only)
export const createLesson = async (lessonData) => {
    try {
        const response = await api.post(`/lessons/`, lessonData);
        return response.data;
    } catch (err) {
        console.error("Error creating lesson:", err);
        throw err;
    }
};

// Update a lesson (teacher only)
export const updateLesson = async (lessonId, updatedData) => {
    try {
        const response = await api.patch(`/lessons/${lessonId}/`, updatedData);
        return response.data;
    } catch (err) {
        console.error("Error updating lesson:", err);
        throw err;
    }
};

// Delete a lesson (teacher only)
export const deleteLesson = async (lessonId) => {
    try {
        const response = await api.delete(`/lessons/${lessonId}/`);
        return response.data; // will likely be empty
    } catch (err) {
        console.error("Error deleting lesson:", err);
        throw err;
    }
};

// ----------------- Student Lesson Actions -----------------








// Get all lessons for a teacher
export const getTeacherLessons = async (teacherId) => {
    try {
        const response = await api.get(`/lessons/${teacherId}`);
        // Filter lessons for this teacher
        return response.data;
    } catch (err) {
        console.error("Error fetching teacher lessons:", err);
        throw err;
    }
};

// ----------------- Student Lesson Actions -----------------

// Pay for a lesson (student only)
export const payForLesson = async (lessonId) => {
    try {
        const response = await api.post(`/payments/create-intent/`, {
            lesson_id: lessonId,
        });
        return response.data;
    } catch (err) {
        console.error("Error paying for lesson:", err);
        throw err;
    }
};

// Send a message to teacher (student only)
export const messageTeacher = async (teacherId, message) => {
    console.log("Just like the simulations.")
};

export const getTeacherPayments = async () => {
    const response = await api.get("payments/teacher/");
    return response.data
};
