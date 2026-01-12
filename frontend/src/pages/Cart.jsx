import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "../components/products.js";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1, selectedSize: "M", selectedColor: "Charcoal" },
    { ...products[1], quantity: 2, selectedSize: "S", selectedColor: "Black" },
  ]);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 ? 0 : 300;
  const total = subtotal + shipping;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      toast.success("Promo code applied! 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
        <ShoppingBag className="w-16 h-16 text-white mb-6" />
        <h1 className="text-3xl font-serif text-white mb-2">Your Cart is Empty</h1>
        <p className="text-white mb-6 text-center max-w-xs">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-4 py-12 md:py-16">
      <motion.div
        className="max-w-5xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide uppercase mb-2 pt-16">
          Shopping Cart
        </h1>
        <p className="text-yellow-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </motion.div>

      {/* Cart Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 p-4 rounded-xl bg-black/70 border border-yellow-500/30 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/product/${item._id}`} className="shrink-0">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-20 h-28 md:w-24 md:h-32 object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="font-medium hover:text-yellow-400 transition">{item.name}</h3>
                  </Link>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="hover:text-red-600 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div>
                  <p className="text-xs text-yellow-500">Size: {item.selectedSize}</p>
                  <p className="text-xs text-yellow-500">Color: {item.selectedColor}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center border border-yellow-500 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-yellow-500/20 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-yellow-500/20 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold">RS.{item.price * item.quantity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <motion.div
            className="bg-black/70 p-6 rounded-xl shadow-lg sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-serif mb-4 text-white">Order Summary</h2>

            <div className="mb-4">
              <label className="block text-xs text-white mb-1">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 rounded-lg bg-black/60 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  onClick={applyPromo}
                  className="px-3 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition font-semibold"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t border-yellow-500/30 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-white">
                <span>Subtotal</span>
                <span>RS.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `RS.${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && <p className="text-xs text-yellow-400">Free shipping on orders over RS.50000</p>}
            </div>

            <div className="border-t border-yellow-500/30 mt-4 pt-4 flex justify-between font-semibold text-lg text-white">
              <span>Total</span>
              <span>RS.{total.toFixed(2)}</span>
            </div>

            <button className="w-full mt-4 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-500 transition"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
