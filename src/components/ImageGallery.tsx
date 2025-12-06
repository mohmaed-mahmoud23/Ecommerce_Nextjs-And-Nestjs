"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(images?.[0]);

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* الصورة الكبيرة */}
      <div className="relative w-full h-[400px] mb-4 bg-gray-100 rounded">
        <Image src={active} alt="product" fill className="object-contain" />
      </div>

      {/* الصور الصغيرة — Flex Wrap في الموبايل فقط */}
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        {images.map((img) => (
          <div
            key={img}
            onClick={() => setActive(img)}
            className={`relative w-20 h-20 cursor-pointer border rounded ${
              active === img ? "border-black" : "border-gray-300"
            }`}
          >
            <Image src={img} alt="thumbnail" fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
