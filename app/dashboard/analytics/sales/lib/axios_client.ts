import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiResponse } from "./api_types";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wandainventory.co.ke"
    : "http://localhost:3000";

const client: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/prediction`,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as ApiResponse<unknown>;
    if (!apiResponse.success) {
      console.warn("[API Error]", apiResponse.message);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 403) {
      console.error(
        "[API Error]",
        "Forbidden: You do not have permission to access this resource.",
      );
    }

    if (error.response?.status === 404) {
      console.error(
        "[API Error]",
        "Not Found: The requested resource does not exist.",
      );
    }

    return Promise.reject(error);
  },
);

export default client;
