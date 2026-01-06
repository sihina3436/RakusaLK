import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import rakuza from "../assets/rakuza.jpeg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
      bg-black/70 backdrop-blur-xl border-b border-white/10
      shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="hover:scale-105 transition-transform duration-300">
            <img
              src={rakuza}
              alt="Rakuza Logo"
              className="w-36 h-16 object-cover object-left"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center space-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `relative text-sm tracking-widest uppercase transition-all duration-300
                   text-gray-300 hover:text-yellow-400
                   after:content-[''] after:absolute after:-bottom-1 after:left-0
                   after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300
                   ${isActive ? "text-yellow-400 after:w-full" : "after:w-0 hover:after:w-full"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              className="hidden md:flex items-center justify-center p-2 rounded-full
              text-gray-300 hover:text-yellow-400 hover:bg-white/10
              transition-all duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <NavLink
              to="/login"
              className="flex items-center justify-center p-2 rounded-full
              text-gray-300 hover:text-yellow-400 hover:bg-white/10
              transition-all duration-300"
              aria-label="Account"
            >
              <User size={20} />
            </NavLink>

            <NavLink
              to="/cart"
              className="flex items-center justify-center p-2 rounded-full
              text-gray-300 hover:text-yellow-400 hover:bg-white/10
              relative transition-all duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span
                className="absolute -top-1 -right-1 w-5 h-5
                bg-yellow-400 text-black text-xs font-semibold
                flex items-center justify-center rounded-full shadow-md"
              >
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 ml-2 text-gray-300 hover:text-yellow-400 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/80 backdrop-blur-xl
            border-t border-white/10 shadow-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `block text-lg tracking-widest uppercase py-2 transition
                     ${isActive ? "text-yellow-400 font-semibold" : "text-gray-300 hover:text-yellow-400"}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10">
                <button
                  className="flex items-center space-x-3 py-2 text-gray-300 hover:text-yellow-400 transition"
                >
                  <Search size={20} />
                  <span className="text-sm uppercase tracking-wider">Search</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
