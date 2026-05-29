import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("tiendamia_token");
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      if (config.data instanceof FormData)
        delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequestUrl = error.config.url;
      if (
        typeof window !== "undefined" &&
        !originalRequestUrl.includes("/auth/login")
      ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
