import apiClient from "./apiClient.js";

// User login service
export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post("/users/login", {
      email,
      password,
    });

    // Store auth token if provided
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// User signup service
export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post("/users/signup", userData);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout service
export const logoutUser = () => {
  localStorage.removeItem("authToken");
  return Promise.resolve();
};

export default {
  loginUser,
  signupUser,
  logoutUser,
};
