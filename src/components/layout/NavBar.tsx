"use client";

import { Search, User, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFetchDataCartQuery } from "@/redux/slices/ApiSlice";

export default function Navbar() {
  const { data } = useFetchDataCartQuery();
  const products = data?.data?.products || [];

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white text-black px-5 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
            TeckMart
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {/* Home */}
          <Link href="/">
            <Button
              variant="ghost"
              className={`px-4 py-2 rounded-xl font-semibold transition
                ${
                  pathname === "/"
                    ? "bg-black text-white shadow"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              Home
            </Button>
          </Link>

          {/* Products */}
          <Link href="/ProdactPage">
            <Button
              variant="ghost"
              className={`px-4 py-2 rounded-xl font-semibold transition
                ${
                  pathname === "/ProdactPage"
                    ? "bg-black text-white shadow"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              Products
            </Button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <Button
              variant="ghost"
              className={`relative px-4 py-2 rounded-xl font-semibold tran  sition flex items-center gap-2
                ${
                  pathname === "/cart"
                    ? "bg-black text-white shadow"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              <ShoppingCart className="w-5 h-5" />
              cart  
              {products.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {products.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Icons + Mobile Menu Button */}
        <div className="flex items-center gap-4 text-xl">
          <Search className="cursor-pointer hover:text-gray-600 transition" />
          <User className="cursor-pointer hover:text-gray-600 transition" />
          <Menu
            className="cursor-pointer md:hidden hover:text-gray-600 transition"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mt-4 flex flex-col gap-3 md:hidden pb-3">
          <Link href="/">
            <Button
              variant="outline"
              className={`w-full px-4 py-2 rounded-xl font-semibold transition
                ${
                  pathname === "/"
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              Home
            </Button>
          </Link>

          <Link href="/ProdactPage">
            <Button
              variant="outline"
              className={`w-full px-4 py-2 rounded-xl font-semibold transition
                ${
                  pathname === "/ProdactPage"
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              Products
            </Button>
          </Link>

          <Link href="/cart">
            <Button
              variant="outline"
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition
                ${
                  pathname === "/cart"
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {products.length > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {products.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
