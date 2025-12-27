import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/v1";

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
  logout: () =>
    api("/auth/logout", {
      method: "POST",
    }),
};

export const userAPI = {
  getUser: async (id) => {
    console.log("this is user id ", id);
    const res = api(`/users/${id}`);
    return res;
  },
  reviewUser: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/users/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
  },

  getAllUsers: async (params) => {
    const query = new URLSearchParams(params).toString();
    const response = await api(`/users?${query}`);
    console.log("this is a data from all ", response);
    return response;
  },

  getUserByRole: async (params) => {
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

  getMentorApplications: () => api("/counselor"),
};
//  COUNSELOR API
export const counselorAPI = {
  submitApplication: (data) => {
    console.log("this is application data", data);
    return api(`/counselor`, {
      method: "POST",
      data: data, // send the payload
    });
  },
  getAllApplications: () => api("/counselor"),
  getApplication: async (id) => {
    console.log("this is application id ", id);
    const res = api(`/counselor/${id}`);
    return res;
  },
  reviewApplication: async ({ status, id, reviewedBy }) => {
    console.log(status, id, reviewedBy);

    return api(`/counselor/${id}`, {
      method: "PATCH",

      data: {
        status,
        reviewedBy,
      },
    });
  },
  getMentees: async (params = {}) => {
    const { counselorId, ...rest } = params;
    console.log("this is counselor data to fetch mentee", params)
    const query = new URLSearchParams(rest).toString();
    try {
      const res = await api(
        `/counseling/counselors/${counselorId}/mentees?${query}`
      );
      return res ? res : { data: [] };
    } catch (err) {
      console.error("Error in getMentees:", err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
  getMenteeStats: async (counselorId) => {
    try {
      const res = await api(
        `/counseling/counselors/${counselorId}/mentees/stats`
      );
      return res?.stats ? res : { stats: {} };
    } catch (err) {
      console.error("Error in getMenteeStats:", err);
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};

//  MENTEE API
export const menteeAPI = {
  getAllApplications: () => api("/mentee"),
  getApplication: async (id) => {
    console.log("this is application id ", id);
    const res = api(`/mentee/${id}`);
    return res;
  },
  reviewApplication: async ({ status, id, reviewedBy }) => {
    console.log(status, id, reviewedBy);

    return api(`/mentee/${id}`, {
      method: "PATCH",

      data: {
        status,
        reviewedBy,
      },
    });
  },
  submitPetition: (data) =>
    api(`/petitions`, {
      method: "POST",
      data,
    }),
  getPetition: async (id) => {
    console.log("this is petition id ", id);
    const res = api(`/petitions/${id}`);
    return res;
  },
  reviewPetition: async ({ status, id, reviewedBy }) => {
    console.log(status, id, reviewedBy);
    return api(`/petitions/${id}`, {
      method: "PATCH",
      data: {
        status,
        reviewedBy,
      },
    });
  },
  getMentee: async (menteeId) => {
    console.log("this is from api", menteeId);
    const res = await api(`/mentees/${menteeId}`);
    console.log("Mentee detail response:", res);
    return res;
  },
  submitCounselorApplication: (data) => {
    console.log("this is application data", data);
    return api(`/mentee`, {
      method: "POST",
      data: data, // send the payload
    });
  },

  getCounselor: async (menteeId) => {
    const res = await api(`/counseling/mentees/${menteeId}/counselor`);
    console.log("this is mentees data", res);
    return res;
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

  getArticle: async (id) => {
    console.log("this is user id ", id);
    const res = api(`/articles/${id}`);
    return res;
  },
  reviewArticle: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/articles/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
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

  getForum: async (id) => {
    console.log("this is user id ", id);
    const res = api(`/forums/${id}`);
    return res;
  },
  reviewForums: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/forums/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
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

  getService: async (id) => {
    console.log("this is user id ", id);
    const res = api(`/services/${id}`);
    return res;
  },
  reviewServices: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/services/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
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
  getProfession: async (id) => {
    console.log("this is user id ", id);
    const res = api(`/professions/${id}`);
    return res;
  },
  reviewProfession: async ({ role, id, reviewedBy }) => {
    console.log(role, id, reviewedBy);

    return api(`/professions/${id}`, {
      method: "PATCH",

      data: {
        role,
        reviewedBy,
      },
    });
  },
};
export const profileAPI = {
  getProfile: async () => {
    const res = await api("/profile/me");
    return res;
  },

  updateProfile: async (data) => {
    // 🔒 no ID needed, backend uses req.user.id
    return api("/profile/me", {
      method: "PATCH",
      data,
    });
  },

  updateProfilePhoto: async (formData) => {
    return api("/profile/me/photo", {
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
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
};export const adminAssignmentAPI = {
  getCounselors: async () => {
    return api(`/counselor`);
  },

  getCounselor: async (counselorId) => {
    if (!counselorId) throw new Error("Counselor ID is required");
    return api(`/counselor/${counselorId}`);
  },

  getRankedMentees: async (counselorId) => {
    if (!counselorId) throw new Error("Counselor ID is required");
    return api(`/counseling/match/${counselorId}`);
  },

  assignMentee: async ({ counselorId, menteeId }) => {
    console.log("Assigning mentee:", { counselorId, menteeId });
    if (!counselorId || !menteeId) {
      throw new Error("Counselor ID and Mentee ID are required");
    }
    return api("/counseling", {
      method: "POST",
      data: {
        counselor: counselorId,  // This is the Application ID (as per your backend)
        mentee: menteeId,        // This is the User ID of the mentee
      },
    });
  },

  // ✅ NEW: Fetch detailed profile of a single mentee assigned to a counselor
  getMenteeDetail: async (menteeId) => {
    if (!menteeId) {
      throw new Error("Mentee ID is required");
    }
    return api(`/counselor/my-mentee/${menteeId}`);
  },
};

export const contactAPI = {
  submitMessage: (data) => {
    return api("/contact", {
      method: "POST",
      data: data,
    });
  },
  getAllMessage: () => api("/contact"),
  getMessage: async (id) => {
    console.log("this is application id ", id);
    const res = api(`/contact/${id}`);
    return res;
  },
  deleteMessage: async (id) => {
    return api(`/contact/${id}`);
  },
};

export const moodEntryAPI = {
  submitMoodEntry: (data) => {
    return api("/mood-entry", {
      method: "POST",
      data: data,
    });
  },
  getAllMoodEntry: () => api("/mood-entry"),
  getMoodEntry: async (id) => {
    console.log("this is application id ", id);
    const res = api(`/mood-entry/${id}`);
    return res;
  },
  deleteMoodEntry: async (id) => {
    return api(`/mood-entry/${id}`);
  },
};