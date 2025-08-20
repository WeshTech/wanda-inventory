"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#16a34a",
          color: "#fff",
          fontWeight: "500",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        success: {
          duration: 3000,
          style: {
            background: "#16a34a",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#16a34a",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#dc2626",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#dc2626",
          },
        },
        loading: {
          style: {
            background: "#16a34a",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#16a34a",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
