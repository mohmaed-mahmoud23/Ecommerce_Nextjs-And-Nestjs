import React from "react";

export default function SkeletonProductDetails() {
  return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        {/* IMAGE SKELETON */}
        <div className="bg-gray-300 w-full h-80 md:h-[500px] rounded-lg"></div>

        {/* INFO SKELETON */}
        <div className="flex flex-col gap-4">
          {/* Brand */}
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-8 w-24 bg-gray-300 rounded"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-3 w-full bg-gray-300 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          </div>

          {/* Stock */}
          <div className="h-4 w-40 bg-gray-300 rounded"></div>

          {/* AddToCart Button */}
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
