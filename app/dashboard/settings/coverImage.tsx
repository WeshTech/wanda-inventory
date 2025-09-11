"use client";

import Image from "next/image";
import { useState } from "react";

export function FullscreenImage() {
  const [hasError, setHasError] = useState(false);
  const imagePath = "/modern-business-office-building-with-glass-windows.jpg";

  if (hasError) {
    // Fallback: Render a simple div with a placeholder background
    return <div className="absolute inset-0 bg-gray-200" />;
  }

  return (
    <Image
      src={imagePath}
      alt="Modern business office building"
      fill
      className="object-cover object-center"
      onError={() => setHasError(true)}
    />
  );
}
