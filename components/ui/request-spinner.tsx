import React from "react";
import { ClipLoader } from "react-spinners";

type SpinnerSize = "sm" | "md" | "lg";

interface RequestSpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const RequestSpinner: React.FC<RequestSpinnerProps> = ({
  size = "md",
  color = "var(--secondary)",
}) => {
  const sizeMap: Record<SpinnerSize, number> = {
    sm: 18,
    md: 32,
    lg: 48,
  };

  return (
    <div className="flex items-center justify-center py-6">
      <ClipLoader color={color} size={sizeMap[size]} />
    </div>
  );
};

export default RequestSpinner;
