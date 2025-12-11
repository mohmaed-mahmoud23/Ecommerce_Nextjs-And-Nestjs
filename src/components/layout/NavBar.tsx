"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/Button"
import { useFetchDataCartQuery } from "@/redux/slices/ApiSlice";

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useFetchDataCartQuery();
  const products = data?.data?.products || [];

  const [openMenu, setOpenMenu] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/ProdactPage" },
    { name: "Cart", href: "/cart" },
    { name: "Login", href: "/auth/login" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
  <motion.h1
  initial={{ scale: 1, opacity: 1 }}
  animate={{
    scale: [1, 1.5, 0.5, 1],       // يكبر – يصغر – يرجع
    opacity: [1, 0.3, 0.3, 1],     // شفاف شوية – يرجع
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="text-2xl md:text-3xl font-bold tracking-wide cursor-pointer text-black"
>
  TeckMart
</motion.h1>

        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2
                  ${
                    pathname === item.href
                      ? "bg-black text-white shadow-lg"
                      : "hover:bg-black hover:text-white"
                  }`}
              >
                {item.name === "Cart" && <ShoppingCart className="w-5 h-5" />}
                {item.name}
                {item.name === "Cart" && products.length > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {products.length}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </div>

        {/* Icons */}
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
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="outline"
                  className={`w-full px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2
                    ${
                      pathname === item.href
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                >
                  {item.name === "Cart" && <ShoppingCart className="w-5 h-5" />}
                  {item.name}
                  {item.name === "Cart" && products.length > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs px-1 py-0.5 rounded-full">
                      {products.length}
                    </span>
                  )}
                </Button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
