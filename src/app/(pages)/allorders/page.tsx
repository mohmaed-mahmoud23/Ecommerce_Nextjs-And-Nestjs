"use client";

import React from "react";
import { useGetUserorderQuery } from "@/redux/slices/ApiSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Page = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetUserorderQuery(userId as string, {
    skip: !userId,
  });

  if (status === "loading")
    return <p className="p-6 text-center text-lg">Loading session...</p>;
  if (isLoading)
    return <p className="p-6 text-center text-lg">Loading orders...</p>;
  if (isError)
    return (
      <p className="p-6 text-center text-red-500">Failed to load orders</p>
    );
  if (!orders || orders.length === 0)
    return <p className="p-6 text-center">No orders found</p>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 border-b-4 border-gray-300-600 pb-4 mb-10">
        My Orders
      </h1>

      {orders.map((order) => (
        <div key={order._id} className="space-y-12">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform">
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">
                Order Details
              </h2>
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethodType}
              </p>
              <p>
                <span className="font-semibold">Paid:</span>{" "}
                {order.isPaid ? "✅ Yes" : "❌ No"}
              </p>
              <p>
                <span className="font-semibold">Delivered:</span>{" "}
                {order.isDelivered ? "✅ Yes" : "❌ No"}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform">
              <h2 className="text-2xl font-semibold mb-4 text-green-700">
                Payment Summary
              </h2>
              <p>
                <span className="font-semibold">Tax:</span> {order.taxPrice} EGP
              </p>
              <p>
                <span className="font-semibold">Shipping:</span>{" "}
                {order.shippingPrice} EGP
              </p>
              <p className="text-xl font-bold mt-3 text-gray-800">
                Total: {order.totalOrderPrice} EGP
              </p>
            </div>
          </div>

          {/* Shipping & User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Shipping Address
              </h2>
              <p>{order.shippingAddress?.details ?? "No address"}</p>
              <p>{order.shippingAddress?.city ?? "-"}</p>
              <p>{order.shippingAddress?.phone ?? "-"}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-[1.02] transition-transform">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                User Info
              </h2>
              <p>{order.user?.name ?? "-"}</p>
              <p>{order.user?.email ?? "-"}</p>
              <p>{order.user?.phone ?? "-"}</p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-200 hover:scale-[1.01] transition-transform">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Order Items
            </h2>
            <ul className="space-y-6">
              {order.cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 p-5 bg-gray-50/70 rounded-xl border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.count} × {item.price} EGP
                    </p>
                    <p className="text-sm text-yellow-500">
                      Rating: {item.product.ratingsAverage} ⭐
                    </p>
                    <p className="text-sm text-gray-600">
                      Brand: {item.product.brand.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Category: {item.product.category.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ratings Quantity: {item.product.ratingsQuantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Subcategories:{" "}
                      {item.product.subcategory
                        ?.map((s) => s.name)
                        .join(", ") ?? "-"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-500 text-right">
            <p>Created at: {new Date(order.createdAt).toLocaleString()}</p>
            {order.paidAt && (
              <p>Paid at: {new Date(order.paidAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
