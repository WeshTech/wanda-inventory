// src/utils/axios.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// This flag helps prevent multiple simultaneous refresh token requests
let isRefreshing = false;

// An interface to extend AxiosRequestConfig with our custom property
interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  __isRetryRequest?: boolean;
}

// A more specific type for the failed queue, to avoid 'any'
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

// A function to process the failed queue
const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // This is crucial for sending cookies in cross-origin requests
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response) => {
    // If the request is successful, simply return the response
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfigWithRetry;
    // Check if the error is due to an expired access token (401) and it's not the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.__isRetryRequest
    ) {
      if (isRefreshing) {
        // If a refresh request is already in progress, add the original request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          // Retry the original request with the new access token
          return axiosApi(originalRequest);
        });
      }

      isRefreshing = true;
      originalRequest.__isRetryRequest = true;

      try {
        // Call the refresh token endpoint
        // The refresh token is automatically sent via the 'withCredentials' cookie
        await axiosApi.post("/auth/refresh");

        // The new access and refresh tokens are now in the cookies.
        // Process the queue and retry all failed requests.
        processQueue(null);

        // Retry the original failed request
        return axiosApi(originalRequest);
      } catch (refreshError: unknown) {
        // If refreshing the token fails (e.g., refresh token expired or invalid),
        // try to log out the user before redirecting.
        try {
          await axiosApi.post("/auth/logout");
        } catch {
          // The error is being handled by redirecting the user,
          // so this failure can be handled silently.
        }

        if (axios.isAxiosError(refreshError)) {
          processQueue(refreshError);
        }

        // Redirect to the login page after cleanup
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject({
          success: false,
          message: "Something went wrong",
        });
      } finally {
        isRefreshing = false;
      }
    }

    // If the error is not a 401, or it is the refresh endpoint itself,
    // reject the promise with the error.
    return Promise.reject(error);
  }
);

// import axios from "axios";

// const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";

// export const axiosApi = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });
