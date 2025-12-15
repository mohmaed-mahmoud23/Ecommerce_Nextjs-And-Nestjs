"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, ShoppingCart, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useFetchDataCartQuery } from "@/redux/slices/ApiSlice";
import { useSession, signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

export default function NavbarMinimal() {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useFetchDataCartQuery();
  const products = data?.data?.products || [];
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/ProdactPage" },
    { name: "Cart", href: "/cart" },
    { name: "categoris", href: "/categoris" },
  ];

  const handleCartClick = () => {
    if (!session) {
      toast.error("You must Login first!");
      router.push("/auth/login");
      return;
    }
    router.push("/cart");
    setOpenMenu(false);
  };

  /* ================= USER SECTIONS ================= */

  const renderUserSection = () => {
    if (status === "loading") return <p>Loading...</p>;

    return (
      <div className="flex items-center gap-3 ml-4 cursor-pointer">
        {status === "authenticated" && (
          <>
            {/* أيقونة المستخدم دلوقتي تبقى clickable */}
            <div
              className="flex items-center gap-2"
              onClick={() => router.push("/allorders")}
            >
              <User className="w-5 h-5 text-gray-700 hover:text-indigo-600 transition-colors" />
              <span className="font-medium hover:text-indigo-600 transition-colors">
                {session?.user?.name}
              </span>
            </div>
          </>
        )}

        <Button
          variant="outline"
          className="flex items-center gap-1 px-3 py-1 rounded-xl"
          onClick={() =>
            status === "authenticated" ? signOut() : router.push("/auth/login")
          }
        >
          {status === "authenticated" ? "Logout" : "Login"}
          {status === "authenticated" ? (
            <LogOut className="w-4 h-4" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  };

  const renderMobileUserSection = () => {
    if (status === "loading") return <p>Loading...</p>;

    return (
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() =>
          status === "authenticated" ? signOut() : router.push("/auth/login")
        }
      >
        {status === "authenticated" ? "Logout" : "Login"}
        {status === "authenticated" ? (
          <LogOut className="w-4 h-4" />
        ) : (
          <LogIn className="w-4 h-4" />
        )}
      </Button>
    );
  };

  /* ================= RENDER ================= */

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          TeckMart
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.name}
                variant="ghost"
                onClick={
                  item.name === "Cart"
                    ? handleCartClick
                    : () => router.push(item.href)
                }
                className={`relative px-3 py-1 font-medium flex items-center gap-1 transition
                  ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
              >
                {item.name === "Cart" && <ShoppingCart className="w-4 h-4" />}
                {item.name}

                {item.name === "Cart" && products.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {products.length}
                  </span>
                )}

                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-black rounded-full"
                  />
                )}
              </Button>
            );
          })}

          {renderUserSection()}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-md px-5 py-3 flex flex-col gap-2"
          >
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={
                    item.name === "Cart"
                      ? handleCartClick
                      : () => {
                          router.push(item.href);
                          setOpenMenu(false);
                        }
                  }
                  className={`w-full flex items-center gap-2 justify-start
                    ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  {item.name === "Cart" && <ShoppingCart className="w-4 h-4" />}
                  {item.name}

                  {item.name === "Cart" && products.length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-1 rounded-full">
                      {products.length}
                    </span>
                  )}
                </Button>
              );
            })}

            {renderMobileUserSection()}
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster position="top-center" />
    </nav>
  );
}
