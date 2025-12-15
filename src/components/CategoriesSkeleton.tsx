import React from "react";

export default function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden shadow animate-pulse bg-gray-100"
        >
          {/* Image Skeleton */}
          <div className="h-40 w-full bg-gray-300" />

          {/* Title Skeleton */}
          <div className="p-4 space-y-2">
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
