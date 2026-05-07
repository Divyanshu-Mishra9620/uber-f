import axios from "axios";

// Add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Ensure credentials are sent with CORS requests
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem("token");

      // Redirect to login if not already there
      const currentPath = window.location.pathname;
      if (
        currentPath !== "/captain-login" &&
        currentPath !== "/login" &&
        currentPath !== "/" &&
        currentPath !== "/signup" &&
        currentPath !== "/captain-signup"
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
