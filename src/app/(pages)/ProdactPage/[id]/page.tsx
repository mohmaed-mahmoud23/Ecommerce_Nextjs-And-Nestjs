"use client";

import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { useGetsingelprodactQuery } from "@/redux/slices/ApiSlice";
import AddToCartButton from "@/components/AddToCartButton";
import { Star } from "lucide-react";
import SkeletonCart from "@/components/SkeletonProdactDetalis";

interface PageProps {
  params: Promise<{ id: string }>; // مهم: params دلوقتي Promise
}

const Prodactdetails = ({ params }: PageProps) => {
  const { id } = React.use(params); // ✅ unwrap الـ Promise

  const { data, isLoading } = useGetsingelprodactQuery(id);

  if (isLoading) return <SkeletonCart />;
  if (!data) return <p>No product found</p>;

  const product = data.data;
  const inStock = product.quantity > 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <ImageGallery images={product.images} />

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase text-gray-500 font-medium">
            {product.brand.name}
          </span>

          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(product.ratingsAverage)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {product.ratingsAverage}
            </span>
            <span className="text-sm text-gray-400">
              ({product.ratingsQuantity})
            </span>
            <span className="text-sm text-gray-400">{product.sold} sold</span>
          </div>

          <p className="text-3xl font-bold text-black">
            ${product.price.toLocaleString()}
          </p>

          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="w-fit text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {product.category.name}
            </span>

            {product.subcategory.map((sub) => (
              <span
                key={sub._id}
                className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700"
              >
                {sub.name}
              </span>
            ))}
          </div>

          <p
            className={`text-sm font-medium ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {inStock ? `Stock: ${product.quantity} available` : "Out of Stock"}
          </p>

          <AddToCartButton productId={product._id} disabled={!inStock} />
        </div>
      </div>
    </div>
  );
};

export default Prodactdetails;
