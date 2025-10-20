// components/creative-loading.tsx
"use client";

import React from "react";

interface CreativeLoadingProps {
  message?: string;
  subMessage?: string;
  size?: "sm" | "md" | "lg";
  showDocument?: boolean;
  showParticles?: boolean;
}

export function CreativeLoading({
  message = "Crunching numbers",
  subMessage,
  size = "md",
  showDocument = true,
  showParticles = true,
}: CreativeLoadingProps) {
  const sizeClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  const loaderSize = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  return (
    <div className={`container mx-auto px-6 ${sizeClasses[size]}`}>
      {/* Animated Invoice Document */}
      {showDocument && (
        <div className="max-w-md mx-auto mb-8">
          <div className="relative h-32 bg-card rounded-lg border-2 border-border shadow-lg p-4">
            {/* Floating document elements */}
            <div className="absolute top-4 left-4 w-20 h-2 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute top-8 left-4 w-16 h-2 bg-secondary/30 rounded-full animate-pulse delay-75"></div>
            <div className="absolute top-12 left-4 w-24 h-2 bg-muted-foreground/20 rounded-full animate-pulse delay-150"></div>

            {/* Animated price tag */}
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center space-x-1">
                <div className="w-6 h-4 bg-primary rounded-sm animate-bounce"></div>
                <div className="w-8 h-6 bg-secondary rounded-md animate-bounce delay-100"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Morphing loader with your colors */}
      <div className="flex justify-center items-center mb-6">
        <div className={`relative ${loaderSize[size]}`}>
          {/* Primary blue orb */}
          <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>

          {/* Secondary lime orb */}
          <div className="absolute inset-2 bg-secondary rounded-full animate-pulse"></div>

          {/* Rotating border */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-secondary rounded-full animate-spin-slow"></div>

          {/* Pulsing dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-ring rounded-full animate-bounce delay-300"></div>
        </div>
      </div>

      {/* Typography animation */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {message.split("").map((char, index) => (
            <span
              key={index}
              className="animate-pulse"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>
        {subMessage && (
          <p className="text-muted-foreground text-sm mt-2">{subMessage}</p>
        )}
      </div>

      {/* Progress bar with gradient */}
      <div className="max-w-xs mx-auto mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-shimmer"></div>
        </div>
      </div>

      {/* Animated status indicators */}
      <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
          <span>Loading data</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse delay-500"></div>
          <span>Processing</span>
        </div>
      </div>

      {/* Floating particles */}
      {showParticles && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0
                  ? "bg-primary"
                  : i % 3 === 1
                  ? "bg-secondary"
                  : "bg-accent"
              } opacity-30 animate-float`}
              style={{
                top: `${20 + i * 10}%`,
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
