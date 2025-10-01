import React from "react";

export const CustomersListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border bg-card p-4 shadow-sm flex flex-col gap-4"
        >
          {/* Avatar + name */}
          <div className="flex items-start gap-2">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* Customer info */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-2/6"></div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <div className="h-8 flex-1 rounded bg-gray-300"></div>
            <div className="h-8 flex-1 rounded bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
