"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Card } from "../../../components/ui/card";
import {
  useClearcartMutation,
  useFetchDataCartQuery,
  useRemovMutation,
  useUpdateCartItemCountMutation,
} from "@/redux/slices/ApiSlice";
import { Button } from "../../../components/ui/Button";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import SkeletonProductCard from "@/components/SkeletonProductCard";

export default function Pagecart() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const router = useRouter(); // ✅ هنا بنجيب الـ router

  const { data, isLoading } = useFetchDataCartQuery();

  const [updateCartItem] = useUpdateCartItemCountMutation();
  const [Rmove, { isLoading: removing }] = useRemovMutation();
  const [clearCart, { isLoading: clearLoading }] = useClearcartMutation();

  // State لكل المنتجات
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const products = React.useMemo(() => data?.data?.products || [], [data]);

  // ضبط الـ state الأولي عند تحميل الداتا
  useEffect(() => {
    if (!products) return;

    const initialCounts: { [key: string]: number } = {};
    products.forEach((item) => {
      initialCounts[item.product._id] = item.count;
    });

    setCounts(initialCounts);
  }, [products]);

  const updateLocalCount = (id: string, newCount: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: newCount,
    }));

    // مسح أي تايمر سابق لنفس المنتج
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
    }

    // عمل تايمر جديد يرسل الريكوست بعد 0.5 ثانية
    timersRef.current[id] = setTimeout(async () => {
      try {
        await updateCartItem({ productId: id, count: newCount }).unwrap();
      } catch {
        toast.error("Error updating count");
      }
    }, 500);
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      toast.success("Cart cleared successfully!");
    } catch {
      toast.error("❌ Failed to clear cart");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await Rmove(id).unwrap();
      toast.success("Removed Successfully");
    } catch {
      toast.error("Error Removing Item");
    }
  };

  // ✅ تعديل الـ checkout function
  const handleCheckout = async () => {
    const cartId = data?.cartId;

    if (!cartId) {
      toast.error("Cart ID not found!");
      return;
    }

    try {
      setCheckoutLoading(true); // 🔥 Start Loading

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
          },
          body: JSON.stringify({
            shippingAddress: {
              details: "details",
              phone: "01010700999",
              city: "Cairo",
            },
          }),
        }
      );

      if (!response.ok) throw new Error("Checkout failed");

      const resData = await response.json();

      if (resData.session?.url) {
        window.location.href = resData.session.url;
      } else {
        toast.error("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to start checkout session");
    } finally {
      setCheckoutLoading(false); // 🔥 Stop Loading
    }
  };

  if (removing || isLoading) return <SkeletonProductCard />;

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-wide">
        🛒 Shopping Cart ({products.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="col-span-2 space-y-4 md:space-y-6 relative pb-20">
          {products.length ? (
            products.map((item) => (
              <Card
                key={item.product._id}
                className="w-[90%] mx-auto md:w-full p-4 md:p-5 flex flex-col md:flex-row gap-3 md:gap-4 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white"
              >
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover border md:w-[110px] md:h-[110px]"
                />
                <div className="flex-1 space-y-1">
                  <h2 className="font-semibold text-base md:text-lg leading-tight">
                    {item.product.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Brand:{" "}
                    <span className="text-gray-700 font-medium">
                      {item.product.brand.name}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Category:{" "}
                    <span className="text-gray-700 font-medium">
                      {item.product.subcategory[0].name}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Quantity Available:{" "}
                    <span className="text-green-600 font-bold">
                      {item.product.quantity}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    <span className="text-green-600 font-bold">
                      {item.price} EGP
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-0">
                  <Button
                    disabled={counts[item.product._id] <= 1}
                    onClick={() => {
                      const old = counts[item.product._id];
                      updateLocalCount(item.product._id, old - 1);
                    }}
                  >
                    -
                  </Button>
                  <span className="w-6 text-center font-semibold text-sm md:text-lg">
                    {counts[item.product._id]}
                  </span>
                  <Button
                    disabled={counts[item.product._id] >= item.product.quantity}
                    onClick={() => {
                      const old = counts[item.product._id];
                      updateLocalCount(item.product._id, old + 1);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleRemove(item.product._id)}
                    variant="outline"
                    className="rounded-full w-8 h-8 md:w-10 md:h-10 text-lg font-bold hover:bg-green-100 hover:text-green-600"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="flex place-items-center text-gray-500 mt-2">
              Cart is Empty
            </p>
          )}
          <Button
            onClick={handleClearCart}
            variant="destructive"
            disabled={clearLoading || products.length === 0}
            className="w-full mt-4 md:w-auto md:mt-6"
          >
            {clearLoading ? "Clearing..." : "Clear Cart"}
          </Button>
        </div>

        <Card className="p-5 md:p-6 h-fit rounded-2xl shadow-md bg-white ">
          <h2 className="font-bold text-xl md:text-2xl mb-4 tracking-wide">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700 mb-3">
            <span className="text-sm md:text-base">Subtotal</span>
            <span className="font-semibold text-gray-900">
              {data?.data.totalCartPrice} EGP
            </span>
          </div>
          <div className="flex justify-between text-gray-700 mb-3">
            <span className="text-sm md:text-base">Items</span>
            <span className="font-semibold">{products.length}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-700 text-sm md:text-base">Shipping</span>
            <span className="text-green-600 font-semibold text-sm md:text-base">
              Free
            </span>
          </div>
          <hr className="my-3" />

          {/* ✅ هنا استدعاء handleCheckout بدون مشاكل TypeScript */}
          <Button
            onClick={() => {
              if (products.length === 0) {
                toast.error("Cart is empty! Add items before checkout.");
                return;
              }

              router.push("/address?from=cart");
            }}
            disabled={checkoutLoading}
            className="w-full py-4 md:py-6 text-base md:text-lg rounded-xl"
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </Button>

          <Button
            variant="outline"
            className="w-full mt-3 py-4 md:py-6 text-base md:text-lg rounded-xl"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    </div>
  );
}
