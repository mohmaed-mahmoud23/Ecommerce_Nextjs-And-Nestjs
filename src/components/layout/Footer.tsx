"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-16 pb-10 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                T
              </div>
              <h2 className="text-2xl font-bold tracking-wide text-black">
                TechMart
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              The future of online shopping — premium tech, fashion & lifestyle
              products delivered to your doorstep with unmatched speed.
            </p>

            <div className="space-y-1 text-sm text-gray-700">
              <p>📍 123 Tech Street, Digital City</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>✉️ support@techmart.com</p>
            </div>

            <div className="flex gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition text-black cursor-pointer"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Shop</h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Electronics",
                "Fashion",
                "Home & Garden",
                "Sports",
                "Deals",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">
              Customer Service
            </h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Contact Us",
                "Help Center",
                "Track Order",
                "Returns",
                "Shipping Info",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">About</h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Our Story",
                "Careers",
                "Press",
                "Investors",
                "Sustainability",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2024 TechMart. All rights reserved.</p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookies"].map((item) => (
              <span
                key={item}
                className="hover:text-black transition cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          <p>Powered by Next.js ⚡</p>
        </div>
      </div>
    </motion.footer>
  );
}
