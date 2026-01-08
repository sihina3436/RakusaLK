import { Link } from "react-router-dom";
import { Instagram, Facebook} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-widest mb-6">
              Rakuza
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Timeless elegance meets modern sophistication. Crafted for those who appreciate the finer things in life.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-yellow-400">Shop All</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-yellow-400">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-yellow-400 cursor-pointer">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-yellow-400 cursor-pointer">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-yellow-400 cursor-pointer">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-yellow-400 cursor-pointer">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-black text-sm bg-neutral-700 placeholder-yellow-500 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                type="submit"
                className="bg-neutral-800 text-yellow-500 px-5 py-2 text-sm uppercase hover:bg-yellow-500 hover:text-black rounded-r transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Rakuza. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-yellow-400 cursor-pointer"><Link to="/privacy">Privacy Policy</Link></span>
            <span className="hover:text-yellow-400 cursor-pointer"><Link to="/terms">Terms of Service</Link></span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;