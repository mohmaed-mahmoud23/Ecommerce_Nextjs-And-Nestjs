import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-extrabold text-xl shadow-lg">
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
              <a className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition text-black">
                <Facebook size={18} />
              </a>
              <a className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition text-black">
                <Twitter size={18} />
              </a>
              <a className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition text-black">
                <Instagram size={18} />
              </a>
              <a className="p-2 rounded-lg bg-black/5 hover:bg-black/10 transition text-black">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">Shop</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:text-black transition">Electronics</li>
              <li className="hover:text-black transition">Fashion</li>
              <li className="hover:text-black transition">Home & Garden</li>
              <li className="hover:text-black transition">Sports</li>
              <li className="hover:text-black transition">Deals</li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">
              Customer Service
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:text-black transition">Contact Us</li>
              <li className="hover:text-black transition">Help Center</li>
              <li className="hover:text-black transition">Track Order</li>
              <li className="hover:text-black transition">Returns</li>
              <li className="hover:text-black transition">Shipping Info</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-black">About</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="hover:text-black transition">Our Story</li>
              <li className="hover:text-black transition">Careers</li>
              <li className="hover:text-black transition">Press</li>
              <li className="hover:text-black transition">Investors</li>
              <li className="hover:text-black transition">Sustainability</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2024 TechMart. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-black transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-black transition cursor-pointer">
              Terms
            </span>
            <span className="hover:text-black transition cursor-pointer">
              Cookies
            </span>
          </div>

          <p>Powered by Next.js ⚡</p>
        </div>
      </div>
    </footer>
  );
}
