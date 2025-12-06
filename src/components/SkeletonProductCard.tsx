// components/SkeletonPageCart.tsx
import { Card } from "@/components/ui/card";

export default function SkeletonPageCart() {
  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-10 animate-pulse">
      {/* TITLE */}
      <div className="h-8 w-1/3 bg-gray-300 rounded mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-4 md:space-y-6 relative pb-20">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="w-[90%] mx-auto md:w-full p-4 md:p-5 flex flex-col md:flex-row gap-3 md:gap-4 rounded-2xl shadow-sm bg-white"
            >
              {/* IMAGE */}
              <div className="w-20 h-20 md:w-[110px] md:h-[110px] bg-gray-200 rounded-xl" />

              {/* PRODUCT INFO */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>{" "}
                {/* Title */}
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>{" "}
                {/* Brand */}
                <div className="h-3 w-1/3 bg-gray-300 rounded"></div>{" "}
                {/* Category */}
                <div className="h-3 w-1/4 bg-gray-300 rounded"></div>{" "}
                {/* Quantity */}
                <div className="h-4 w-1/4 bg-gray-300 rounded"></div>{" "}
                {/* Price */}
              </div>

              {/* QTY CONTROL */}
              <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-0">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full" />{" "}
                {/* - */}
                <div className="w-6 h-6 bg-gray-200 rounded" /> {/* Count */}
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full" />{" "}
                {/* + */}
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full" />{" "}
                {/* Trash */}
              </div>
            </Card>
          ))}

          {/* Clear Cart Button */}
          <div className="h-12 w-1/3 bg-gray-300 rounded mt-4 md:mt-6"></div>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <Card className="p-5 md:p-6 h-fit rounded-2xl shadow-md bg-white space-y-4">
          <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>{" "}
          {/* Title */}
          <div className="flex justify-between mb-3">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
          </div>
          <hr className="border-gray-300" />
          <div className="h-12 w-full bg-gray-300 rounded"></div>{" "}
          {/* Proceed to Checkout */}
          <div className="h-12 w-full bg-gray-300 rounded mt-3"></div>{" "}
          {/* Continue Shopping */}
        </Card>
      </div>
    </div>
  );
}
