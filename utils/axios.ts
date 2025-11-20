import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let isFetchingCsrf = false;
let csrfToken: string | null = null;

interface InternalAxiosRequestConfigWithRetry
  extends InternalAxiosRequestConfig {
  __isRetryRequest?: boolean;
  __isCsrfRetry?: boolean;
}

interface FailedQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: FailedQueueItem[] = [];

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
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.wandainventory.co.ke";

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Function to fetch CSRF token
const fetchCsrfToken = async (): Promise<string> => {
  if (isFetchingCsrf) {
    // Wait for the ongoing fetch to complete
    return new Promise((resolve, reject) => {
      const checkToken = setInterval(() => {
        if (!isFetchingCsrf) {
          clearInterval(checkToken);
          if (csrfToken) {
            resolve(csrfToken);
          } else {
            reject(new Error("Failed to fetch CSRF token"));
          }
        }
      }, 100);
    });
  }

  isFetchingCsrf = true;
  try {
    const response = await axios.get<{ token: string }>(
      `${API_BASE_URL}/csrf/token`,
      {
        withCredentials: true,
      }
    );
    csrfToken = response.data.token;
    return csrfToken;
  } catch (error) {
    csrfToken = null;
    throw error;
  } finally {
    isFetchingCsrf = false;
  }
};

// Request interceptor to add CSRF token
axiosApi.interceptors.request.use(
  async (config) => {
    const method = config.method?.toUpperCase();
    // Add CSRF token for non-GET requests
    if (method && !["GET", "HEAD", "OPTIONS"].includes(method)) {
      if (!csrfToken) {
        try {
          csrfToken = await fetchCsrfToken();
        } catch (error) {
          console.error("Failed to fetch CSRF token:", error);
        }
      }
      if (csrfToken) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfigWithRetry;

    // Handle CSRF token errors (403)
    if (
      error.response?.status === 403 &&
      originalRequest &&
      !originalRequest.__isCsrfRetry
    ) {
      const errorData = error.response.data as {
        error?: string;
        message?: string;
      };

      // Check if it's a CSRF error
      if (
        errorData?.error === "CSRF_TOKEN_MISSING" ||
        errorData?.error === "INVALID_CSRF_TOKEN" ||
        errorData?.message?.toLowerCase().includes("csrf")
      ) {
        originalRequest.__isCsrfRetry = true;

        try {
          // Reset the old token and fetch a new one
          csrfToken = null;
          const newToken = await fetchCsrfToken();

          // Update the request header with the new token
          if (originalRequest.headers) {
            originalRequest.headers["x-csrf-token"] = newToken;
          }

          // Retry the original request
          return axiosApi(originalRequest);
        } catch (csrfError) {
          console.error("Failed to refresh CSRF token:", csrfError);
          return Promise.reject(error);
        }
      }
    }

    // Handle authentication errors (401)
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
        } catch {
          // Silent failure
        }

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
// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// // This flag helps prevent multiple simultaneous refresh token requests
// let isRefreshing = false;

// // An interface to extend AxiosRequestConfig with our custom property
// interface InternalAxiosRequestConfigWithRetry
//   extends InternalAxiosRequestConfig {
//   __isRetryRequest?: boolean;
// }

// // A more specific type for the failed queue, to avoid 'any'
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
// }[] = [];

// // A function to process the failed queue
// const processQueue = (error: AxiosError | null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve();
//     }
//   });

//   failedQueue = [];
// };

// const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// export const axiosApi = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   // This is crucial for sending cookies in cross-origin requests
//   withCredentials: true,
// });

// axiosApi.interceptors.response.use(
//   (response) => {
//     // If the request is successful, simply return the response
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfigWithRetry;
//     // Check if the error is due to an expired access token (401) and it's not the refresh endpoint itself
//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest.__isRetryRequest
//     ) {
//       if (isRefreshing) {
//         // If a refresh request is already in progress, add the original request to the queue
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => {
//           // Retry the original request with the new access token
//           return axiosApi(originalRequest);
//         });
//       }

//       isRefreshing = true;
//       originalRequest.__isRetryRequest = true;

//       try {
//         // Call the refresh token endpoint
//         // The refresh token is automatically sent via the 'withCredentials' cookie
//         await axiosApi.post("/auth/refresh");

//         // The new access and refresh tokens are now in the cookies.
//         // Process the queue and retry all failed requests.
//         processQueue(null);

//         // Retry the original failed request
//         return axiosApi(originalRequest);
//       } catch (refreshError: unknown) {
//         // If refreshing the token fails (e.g., refresh token expired or invalid),
//         // try to log out the user before redirecting.
//         try {
//           await axiosApi.post("/auth/logout");
//         } catch {
//           // The error is being handled by redirecting the user,
//           // so this failure can be handled silently.
//         }

//         if (axios.isAxiosError(refreshError)) {
//           processQueue(refreshError);
//         }

//         // Redirect to the login page after cleanup
//         if (typeof window !== "undefined") {
//           window.location.href = "/auth/login";
//         }

//         return Promise.reject({
//           success: false,
//           message: "Something went wrong",
//         });
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     // If the error is not a 401, or it is the refresh endpoint itself,
//     // reject the promise with the error.
//     return Promise.reject(error);
//   }
// );

// // import axios from "axios";

// // const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// // export const axiosApi = axios.create({
// //   baseURL: API_BASE_URL,
// //   timeout: 10000,
// //   headers: {
// //     "Content-Type": "application/json",
// //     Accept: "application/json",
// //   },
// //   withCredentials: true,
// // });
