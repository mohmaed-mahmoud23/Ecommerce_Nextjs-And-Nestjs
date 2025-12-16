"use client";
import { getSession } from "next-auth/react";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface CheckoutResponse {
  session?: {
    url?: string;
  };
}

import {
  useAddAddressMutation,
  useFetchDataCartQuery,
} from "@/redux/slices/ApiSlice";
import { toast } from "react-toastify";

// Validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  details: yup.string().required("Details are required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10,15}$/, "Phone must be valid"),
  city: yup.string().required("City is required"),
});

interface IFormInputs {
  name: string;
  details: string;
  phone: string;
  city: string;
}

const Page = () => {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";

  const [addAddress, { isLoading }] = useAddAddressMutation();
  const { data } = useFetchDataCartQuery();



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: IFormInputs) => {
    setMessage("");

    try {
      await addAddress(formData).unwrap();
      setMessage("Address added successfully!");
      reset();

      if (fromCart) {
        const cartId = data?.cartId;
        if (!cartId) {
          toast.error("Cart ID not found!");
          return;
        }



        const session = await getSession()

        if (!session?.token) {
          toast.error("You must login first!");
          return;
        }

        const response = await fetch( 
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: session.token,
            },
            body: JSON.stringify({
              shippingAddress: formData,
            }),
          }
        );

        const resData: CheckoutResponse = await response.json();

        if (resData.session?.url) {
          window.location.href = resData.session.url;
        } else {
          toast.error("No checkout URL returned");
        }
      }
    } catch (err: unknown) {
      let errorMessage = "Something went wrong";

      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as { data?: { message?: string } }).data?.message ===
          "string"
      ) {
        errorMessage = (err as { data?: { message?: string } }).data!.message!;
      }

      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center `bg-gradient-to-br` from-gray-100 to-gray-200 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Add New Address
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["name", "details", "phone", "city"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label className="block mb-1 font-medium text-gray-700 capitalize">
                {field}
              </label>

              <input
                type="text"
                {...register(field as keyof IFormInputs)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition outline-none bg-white shadow-sm hover:shadow-md"
                placeholder={`Enter ${field}`}
              />

              {errors[field as keyof IFormInputs] && (
                <span className="text-red-500 text-sm">
                  {errors[field as keyof IFormInputs]?.message}
                </span>
              )}
            </motion.div>
          ))}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 8px 22px rgba(59,130,246,0.3)",
            }}
            transition={{ duration: 0.2 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
          >
            {isLoading ? "Submitting..." : "Save Address"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-green-600 font-medium mt-4"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Page;
