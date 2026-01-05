import { useState } from "react";
import { NavLink } from "react-router-dom"; // use NavLink for active page
import { Menu, X, Search, User, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import rakuza from "../assets/rakuza.jpeg"


const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo (Left) */}
          <NavLink
            to="/"
            className="font-serif text-2xl md:text-3xl tracking-wide uppercase text-gray-900 hover:text-yellow-500 transition-transform duration-300 hover:scale-105"
          >
          <img
                    src={rakuza}
                    alt="logo"
                    className="w-36 h-16 object-cover object-left"
                  />
          </NavLink>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden lg:flex flex-1 justify-center space-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `relative text-sm tracking-wider uppercase transition-colors duration-300
                   text-gray-700 hover:text-gray-900
                   after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300
                   ${isActive ? "text-gray-900 after:w-full" : "after:w-0 hover:after:w-full"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-yellow-500 transition-transform duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            {/* <NavLink
              to="/wishlist"
              className="flex items-center justify-center p-2 rounded-full hover:bg-yellow-100 hover:text-yellow-500 transition-transform duration-300"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </NavLink> */}
            <NavLink
              to="/dashboard"
              className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-yellow-500 transition-transform duration-300"
              aria-label="Account"
            >
              <User size={20} />
            </NavLink>
            <NavLink
              to="/cart"
              className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-yellow-500 relative transition-transform duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-300 text-black text-xs flex items-center justify-center rounded-full shadow">
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 ml-2 hover:text-yellow-500 transition-transform duration-300"
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
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-md"
          >
            <div className="px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `block text-lg tracking-wide uppercase py-2 transition-colors duration-300
                     ${isActive ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-yellow-500"}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-3 py-2 text-gray-900 hover:text-yellow-500 transition duration-300">
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