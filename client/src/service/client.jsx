import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    console.log("🌐 API Call:", config.url, config);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Success:", response.data);
    return response;
  },
  (error) => {
    console.error("💥 API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("student_id");
      window.dispatchEvent(new Event("authStateChange"));
    }
    return Promise.reject(error);
  }
);
const api = async (endpoint, options = {}) => {
  try {
    const response = await apiClient(endpoint, options);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "API request failed"
    );
  }
};

//  AUTH API
export const authAPI = {
  signUp: (data) => {
    console.log("this is signup data", data);
    const { name, email, password, passwordConfirm } = data;
    const res = api("/auth/sign-up", {
      method: "POST",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    return res;
  },
  login: ({ email, password }) =>
    api("/auth/login", {
      method: "POST",
      data: { email, password },
    }),
  forgotPassword: (email) => {
    console.log("forgot password gets clicked and now email:", email);
    return api("/auth/forgot", {
      method: "POST",
      data: { email },
    });
  },
  resetPassword: ({ token, password, passwordConfirm }) => {
    return api(`/auth/reset-password/${token}`, {
      method: "POST",
      data: { password, passwordConfirm },
    });
  },
  updatePassword: ({ password, passwordConfirm, passwordCurrent }) => {
    return api(`/auth/update-password`, {
      method: "PATCH",
      data: { password, passwordConfirm, passwordCurrent },
    });
  },
};

//  MENTEE API
export const menteeAPI = {
  submitPetition: (data) =>
    api(`/petitions`, {
      method: "POST",
      data,
    }),

  getMentor: (menteeId) => api(`/mentorships/mentees/${menteeId}/mentor`),
};

//  MENTOR API
export const mentorAPI = {
  submitApplication: (data) =>
    api(`/applications`, {
      method: "POST",
      data,
    }),
  getMentees: async (params = {}) => {
    const { mentorId } = params;
    try {
      const res = await api(`/mentorships/mentors/${mentorId}/mentees`, {
        params,
      });
      return res ? res : { data: [] };
    } catch (err) {
      console.error("Error in getMentees:", err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
  getMenteeStats: async (mentorId) => {
    try {
      const res = await api(`/mentorships/mentors/${mentorId}/mentees/stats`);
      return res?.stats ? res : { stats: {} };
    } catch (err) {
      console.error("Error in getMenteeStats:", err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};
// Articles
export const articleAPI = {
  getAllArticle: async (params) => {
    const query = new URLSearchParams(params).toString();
    console.log("article query", query);
    const response = await api(`/articles?${query}`);
    console.log("this is a data from all ", response?.data?.data);

    return response?.data?.data;
  },
  getArticleByType: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api(`/articles/by-type?${query}`);
      console.log("article filetred by type", response);
      return response;
    } catch (err) {
      console.error("API request failed:", err);
      throw err;
    }
  },

  createArticle: async (data) => {
    const res = await apiClient.post("/articles", data);
    return res.data;
  },
};


// Forum
export const forumAPI = {
  getAllForums: async (params) => {
    const query = new URLSearchParams(params).toString();
    console.log("forum query", query);
    const response = await api(`/forums?${query}`);
    console.log("this is a data from all ", response?.data?.data);

    return response?.data?.data;
  },
  getForumsByType: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api(`/forums/by-type?${query}`);
      console.log("article filetred by type", response);
      return response;
    } catch (err) {
      console.error("API request failed:", err);
      throw err;
    }
  },

  createForums: async (data) => {
    const res = await apiClient.post("/forums", data);
    return res.data;
  },
};


// service api

export const serviceAPI = {
  getAllServices: async (params) => {
    const query = new URLSearchParams(params).toString();
    console.log("forum query", query);
    const response = await api(`/services?${query}`);
    console.log("this is a data from all ", response?.data?.data);

    return response?.data?.data;
  },
  getServicesByType: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api(`/services/by-type?${query}`);
      console.log("service filetred by type", response);
      return response;
    } catch (err) {
      console.error("API request failed:", err);
      throw err;
    }
  },

  createService: async (data) => {
    const res = await apiClient.post("/services", data);
    return res.data;
  },
};

//  profession api

export const professionalAPI = {
  getAllProfessionals: async (params) => {
    const query = new URLSearchParams(params).toString();
    console.log("profession query", query);
    const response = await api(`/professions?${query}`);
    console.log("this is a data from all ", response?.data?.data);

    return response?.data?.data;
  },
  getProfessionalsByType: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api(`/professions/by-type?${query}`);
      console.log("profession filetred by type", response);
      return response;
    } catch (err) {
      console.error("API request failed:", err);
      throw err;
    }
  },

  createProfessional: async (data) => {
    const res = await apiClient.post("/professions", data);
    return res.data;
  },
};


//  STUDENT UNION API
export const studentUnionAPI = {
  getAllStudents: async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await api(`/users?${query}`);
    console.log("this is a data from all ", response);
    return response;
  },

  getStudentsByRole: async (params) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await api(`/users/by-role?${query}`);
      console.log("this is a data from by role", response);
      return response;
    } catch (err) {
      console.error("API request failed:", err);
      throw err;
    }
  },

  getMentorApplications: () => api("/application"),
};

//  STUDENT  API
export const studentAPI = {
  getStudentDetails: async (id) => {
    console.log("this is student id ", id);
    const res = api(`/students/${id}`);
    return res;
  },
  getStudentStats: async () => {
    const res = await api("/students/stats");
    console.log("this is respose", res.data);
    return res.data;
  },
  reviewStudent: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/students/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
  },
};

//  APPLICATION API
export const applicationAPI = {
  submitApplication: (data) =>
    api("/applications", {
      method: "POST",
      data,
    }),
  getAllApplications: () => api("/applications"),
  getApplicationDetails: async (id) => {
    console.log("this is application id ", id);
    const res = api(`/applications/${id}`);
    return res;
  },
  reviewApplication: async ({ status, id, reviewedBy }) => {
    console.log(status, id, reviewedBy);

    return api(`/applications/${id}`, {
      method: "PATCH",

      data: {
        status,
        reviewedBy,
      },
    });
  },
};

export const profileAPI = {
  getProfile: (id) => {
    console.log("this profile integration works");
    const res = api(`/users/me/${id}`);
    return res;
  },
  updateProfile: (params) => {
    console.log("this is params", params);
    const { id, ...data } = params;
    const res = api(`/users/me/${id}`, {
      method: "PATCH",
      data,
    });
    return res;
  },
  updateProfilePhoto: (formData) => {
    console.log("this is photo and is", formData);
    const res = api(`/users/me/photo`, {
      method: "PATCH",
      data: formData,
    });
    return res;
  },
};

//  PETITION API
export const petitionAPI = {
  submitPetition: (data) =>
    api(`/petitions`, {
      method: "POST",
      data,
    }),
  getAllPetitions: () => api("/petitions"),
  getPetitionDetails: async (id) => {
    console.log("this is petition id ", id);
    const res = api(`/petitions/petition-detail/${id}/details`);
    return res;
  },
  reviewPetition: async ({ status, id, reviewedBy }) => {
    console.log(status, id, reviewedBy);
    return api(`/petitions/petition-detail/${id}/status`, {
      method: "PATCH",
      data: {
        status,
        reviewedBy,
      },
    });
  },
};
export const conversationAPI = {
  getConversation: async (room) => {
    console.log("room from api", room);
    return api(`/conversation/${room}/group-chats`);
  },
};

export const chatBotAPI = {
  getChatResponse: (message) => {
    console.log("this is message to chatbot", message);
    return api("/chatbot/respond", {
      method: "POST",
      data: {
        message,
      },
    });
  },
};
