"use client";

import { toast as hotToast } from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

type Toast = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

function toast({ title, description, variant }: Toast) {
  const message = description
    ? `${title ? title + ": " : ""}${description}`
    : (title ?? "");
  const options: ToastOptions = {};

  if (variant === "destructive") {
    return { id: hotToast.error(message, options) };
  }

  return { id: hotToast.success(message, options) };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        hotToast.dismiss(toastId);
      } else {
        hotToast.dismiss();
      }
    },
  };
}

export { useToast, toast };
