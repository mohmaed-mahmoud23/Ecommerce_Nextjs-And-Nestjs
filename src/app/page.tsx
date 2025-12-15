"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "Welcome to TeckMart";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
      setDisplayText(text.slice(0, index));
      setIndex((prev) => prev + 1);

      if (index > text.length) {
        setTimeout(() => {
          setIndex(0); // إعادة من الأول
        }, 1000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300">
      {/* خلفية دوائر متحركة بسيطة */}
      <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl -bottom-20 -right-20"></div>

      <div className="relative text-center max-w-2xl px-6">
        {/* العنوان المتكتب */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight drop-shadow-sm">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
          Discover the latest technology, gadgets, and accessories at unbeatable
          prices. Experience a modern way of shopping with fast delivery and the
          best tech collections.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link href="/ProdactPage">
            <Button className="px-7 py-6 bg-black text-white font-semibold rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
              Shop Now
            </Button>
          </Link>
          <Link href={"/categoris"}>
            <Button className="px-7 py-6 bg-white text-black font-semibold rounded-xl hover:bg-black hover:text-white shadow transition-all duration-300">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
