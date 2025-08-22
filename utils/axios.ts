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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosApi.interceptors.response.use(
  (response) => {
    // If the request is successful, simply return the response
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfigWithRetry;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.__isRetryRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosApi(originalRequest);
        });
      }

      isRefreshing = true;
      originalRequest.__isRetryRequest = true;

      try {
        await axiosApi.post("/auth/refresh");

        processQueue(null);

        return axiosApi(originalRequest);
      } catch (refreshError: unknown) {
        try {
          await axiosApi.post("/auth/logout");
        } catch {}

        if (axios.isAxiosError(refreshError)) {
          processQueue(refreshError);
        }

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

    return Promise.reject(error);
  }
);
