import React from "react";
import { ScaleLoader } from "react-spinners";

const TopUpSpinner = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <ScaleLoader color="var(--secondary)" height={28} width={4} />
    </div>
  );
};

export default TopUpSpinner;
