import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  usePlaceOrderMutation,
  useUplpadPaySlipMutation,
} from "../redux/order/orderApi";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../redux/cart/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, totalPrice } = useSelector((state) => state.cart);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const [uploadPaySlip] = useUplpadPaySlipMutation();

  const [paySlip, setPaySlip] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      toast.error("File must be under 5MB");
      return;
    }

    setPaySlip(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPaySlip(null);
    setPreviewUrl(null);
  };

  const handlePlaceOrder = async () => {
    if (products.length === 0) {
      return toast.error("Cart is empty");
    }

    if (!paySlip) {
      return toast.error("Please upload payment slip");
    }

    try {
      // 🔹 Step 1: Upload PaySlip to Cloudinary
      const formData = new FormData();
      formData.append("paySlip", paySlip);

      const uploadResponse = await uploadPaySlip(formData).unwrap();
      const paySlipUrl = uploadResponse.url;

      // 🔹 Step 2: Place Order using URL
      await placeOrder({
        cartItems: products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        paySlip: paySlipUrl,
      }).unwrap();

      toast.success("Order placed successfully 🎉");

      dispatch(clearCart());
      setPaySlip(null);
      setPreviewUrl(null);
    } catch (err) {
      toast.error(err?.data?.message || "Order failed");
      console.log(err);
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-black text-white px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-14 text-center tracking-wide">
          <span>Your </span>
          <span className="text-yellow-500">Cart</span>
        </h1>

        {products.length === 0 && (
          <div className="text-center text-zinc-500 text-lg">
            Your cart is empty 🛒
          </div>
        )}

        <div className="space-y-6">
          {products.map((item) => (
            <div
              key={`${item._id}-${item.size}-${item.color}`}
              className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-zinc-400">
                    Size: {item.size || "N/A"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Color: {item.color || "N/A"}
                  </p>
                  <p className="text-yellow-500 font-bold mt-2">
                    Rs. {item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-zinc-700 rounded-full px-3 py-1">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          size: item.size,
                          color: item.color,
                          type: "dec",
                        })
                      )
                    }
                  >
                    <Minus size={18} />
                  </button>

                  <span className="px-3 text-yellow-500 font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item._id,
                          size: item.size,
                          color: item.color,
                          type: "inc",
                        })
                      )
                    }
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({
                        id: item._id,
                        size: item.size,
                        color: item.color,
                      })
                    )
                  }
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <div className="mt-16 border-t border-zinc-800 pt-8 flex flex-col gap-8">
            <div>
              <p className="text-sm text-zinc-500 uppercase">
                Total Amount
              </p>
              <p className="text-3xl font-bold text-yellow-500">
                Rs. {totalPrice}
              </p>
            </div>

            {/* PaySlip Upload */}
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4 tracking-wide">
                Payment Slip
              </h3>

              {!previewUrl ? (
                <label className="group relative flex flex-col items-center justify-center 
                  w-full h-56 rounded-2xl 
                  border border-zinc-700 
                  bg-gradient-to-br from-zinc-900 to-zinc-800
                  hover:border-yellow-500/50
                  hover:shadow-lg hover:shadow-yellow-500/10
                  transition-all duration-300 cursor-pointer overflow-hidden">

                  <i className="ri-upload-cloud-2-line text-5xl text-zinc-500 
                    group-hover:text-yellow-400 transition duration-300"></i>

                  <p className="mt-4 text-zinc-400 group-hover:text-yellow-400 transition">
                    Click to upload payment slip
                  </p>

                  <p className="text-xs text-zinc-600 mt-2">
                    JPG, PNG (Max 5MB)
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              ) : (
                <div className="relative group w-full h-56 rounded-2xl overflow-hidden border border-zinc-700">
                  <img
                    src={previewUrl}
                    alt="Pay Slip"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/60 opacity-0 
                    group-hover:opacity-100 transition duration-300 
                    flex items-center justify-center gap-6">

                    <label className="cursor-pointer text-white hover:text-yellow-400 transition">
                      <i className="ri-refresh-line text-2xl"></i>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    <button
                      onClick={removeImage}
                      className="text-white hover:text-red-500 transition"
                    >
                      <i className="ri-delete-bin-6-line text-2xl"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="px-10 py-3 rounded-full font-semibold bg-yellow-500 text-black hover:bg-yellow-400 transition"
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;