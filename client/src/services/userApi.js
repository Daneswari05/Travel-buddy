import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function registerUser(userData) {
  try {
    const response = await instance.post("/api/users/register", userData);
    return response.data.user;
  } catch (error) {
    throw new Error("Failed to register user");
  }
}

export async function loginUser(credentials) {
  try {
    const response = await instance.post("/api/users/login", credentials);
    return response.data.user;
  } catch (error) {
    throw new Error("Failed to login user");
  }
}
