import axios from "axios";

const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
