"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Button } from "../../../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const formSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

export default function BugReportForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: { email: string; password: string }) {
    const res = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);

    if (res?.ok) {
      toast.success("Login success");
      router.push("/"); // ريديركت للصفحة الرئيسية
    } else {
      toast.error("Invalid email or password");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Card with glow */}
      <motion.div
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(0,0,0,0.0)",
            "0px 0px 20px rgba(0,0,0,0.15)",
            "0px 0px 0px rgba(0,0,0,0.0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Card className="w-full max-w-md mx-auto my-6 p-4 sm:p-6 backdrop-blur-lg bg-white/60 border border-white/40 shadow-xl rounded-2xl relative overflow-hidden">
          <CardHeader className="relative">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-2xl font-bold tracking-wide"
            >
              Sign In
            </motion.h2>
            <CardDescription className="text-center mt-1">
              Help us improve by reporting bugs you encounter.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <motion.div whileFocus={{ scale: 1.03 }}>
                        <Input
                          {...field}
                          id="email-input"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email"
                          autoComplete="off"
                          className="transition-all duration-300 focus:ring-2 focus:ring-black/60 focus:shadow-lg"
                        />
                      </motion.div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>
                      <motion.div whileFocus={{ scale: 1.03 }}>
                        <Input
                          {...field}
                          id="password-input"
                          type="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your password"
                          autoComplete="off"
                          className="transition-all duration-300 focus:ring-2 focus:ring-black/60 focus:shadow-lg"
                        />
                      </motion.div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="relative flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                form="form-rhf-demo"
                className="relative overflow-hidden font-bold"
              >
                <motion.span
                  className="absolute inset-0` bg-gradient-to-r` from-black via-gray-700 to-black opacity-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative">Submit</span>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
