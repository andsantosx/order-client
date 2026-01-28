import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    // Import store dynamically or use getState if possible, 
    // but circular dependencies can be tricky. 
    // Safest way with Zustand is using getState() from the import.
    // We need to import useAuthStore at the top.
    const token = localStorage.getItem("auth-storage")
        ? JSON.parse(localStorage.getItem("auth-storage")!).state.token
        : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
