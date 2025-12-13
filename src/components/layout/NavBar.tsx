"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, ShoppingCart, LogOut, LogIn } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useFetchDataCartQuery } from "@/redux/slices/ApiSlice";
import { useSession, signOut } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useFetchDataCartQuery();
  const products = data?.data?.products || [];
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/ProdactPage" },
    { name: "Cart", href: "/cart" },
  ];

  // User section for Desktop
  const renderUserSection = () => {
    if (status === "loading") return <p>Loading...</p>;

    if (status === "authenticated") {
      return (
        <div className="flex items-center gap-3 ml-4">
          <User className="w-5 h-5" />
          <span>{session?.user?.name}</span>
          <Button
            onClick={() => signOut()}
            className="flex items-center gap-1 px-3 py-1 rounded-xl border border-gray-300"
          >
            Logout <LogOut className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={() => router.push("/auth/login")}
        className="flex items-center gap-1 px-3 py-1 rounded-xl border border-gray-300"
      >
        Login <LogIn className="w-4 h-4" />
      </Button>
    );
  };

  // User section for Mobile
  const renderMobileUserSection = () => {
    if (status === "loading") return <p>Loading...</p>;
    if (status === "authenticated") {
      return (
        <Button
          onClick={() => signOut()}
          className="flex items-center gap-1 px-3 py-1 rounded-xl border border-gray-300"
        >
          Logout <LogOut className="w-4 h-4" />
        </Button>
      );
    }
    return (
      <Button
        onClick={() => router.push("/auth/login")}
        className="flex items-center gap-1 px-3 py-1 rounded-xl border border-gray-300"
      >
        Login <LogIn className="w-4 h-4" />
      </Button>
    );
  };

  // Handle Cart click
  const handleCartClick = () => {
    if (!session) {
      toast.error("لازم تعمل تسجيل دخول عشان تروح للكارد");
      router.push("/auth/login"); // ريديركت للصفحة الرئيسية

      return;
    }
    router.push("/cart");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.5, 0.5, 1],
            opacity: [1, 0.3, 0.3, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer text-black"
          onClick={() => router.push("/")}
        >
          TeckMart
        </motion.h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            if (item.name === "Cart") {
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
                    pathname === item.href
                      ? "bg-black text-white shadow-lg"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {item.name}
                  {products.length > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {products.length}
                    </span>
                  )}
                </Button>
              );
            }
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
                  pathname === item.href
                    ? "bg-black text-white shadow-lg"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() => router.push(item.href)}
              >
                {item.name}
              </Button>
            );
          })}

          {/* User Section */}
          {renderUserSection()}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 text-xl md:hidden">
          <User className="cursor-pointer hover:text-gray-600 transition" />
          <Menu
            className="cursor-pointer hover:text-gray-600 transition"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="flex flex-col gap-3 md:hidden shadow-md pb-4 px-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {menuItems.map((item) => {
              if (item.name === "Cart") {
                return (
                  <Button
                    key={item.name}
                    variant="outline"
                    className={`w-full px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
                      pathname === item.href
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                    onClick={handleCartClick}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {item.name}
                    {products.length > 0 && (
                      <span className="ml-auto bg-red-600 text-white text-xs px-1 py-0.5 rounded-full">
                        {products.length}
                      </span>
                    )}
                  </Button>
                );
              }
              return (
                <Button
                  key={item.name}
                  variant="outline"
                  className={`w-full px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 ${
                    pathname === item.href
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  {item.name}
                </Button>
              );
            })}

            {/* Mobile User Section */}
            {renderMobileUserSection()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toaster */}
      <Toaster position="top-center" />
    </nav>
  );
}
