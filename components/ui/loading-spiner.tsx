"use client";

import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface LoaderProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader = ({
  text = "Loading...",
  size = "md",
  className = "",
}: LoaderProps) => {
  const sizeMap = {
    sm: {
      spinner: 40,
      containerHeight: "h-[40vh]",
      textSize: "text-sm",
    },
    md: {
      spinner: 60,
      containerHeight: "h-[50vh]",
      textSize: "text-base",
    },
    lg: {
      spinner: 80,
      containerHeight: "h-[70vh]",
      textSize: "text-lg",
    },
  };

  const responsiveSpinnerSize = {
    base: sizeMap[size].spinner * 0.7,
    sm: sizeMap[size].spinner * 0.8,
    md: sizeMap[size].spinner,
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const spinnerColor = theme === "dark" ? "#E0E7FF" : "#2563EB";

  const getSpinnerSize = () => {
    if (typeof window === "undefined") return responsiveSpinnerSize.md;
    const width = window.innerWidth;
    if (width < 640) return responsiveSpinnerSize.base;
    if (width < 768) return responsiveSpinnerSize.sm;
    return responsiveSpinnerSize.md;
  };

  return (
    <div
      className={`${sizeMap[size].containerHeight} flex flex-col justify-center items-center space-y-4 ${className}`}
    >
      <div className="relative">
        <HashLoader
          size={getSpinnerSize()}
          color={spinnerColor}
          className="!block"
        />
      </div>

      <div className="text-center space-y-2">
        <p
          className={`${sizeMap[size].textSize} font-medium text-foreground animate-pulse`}
        >
          {text}
        </p>
        <p className="text-xs text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
