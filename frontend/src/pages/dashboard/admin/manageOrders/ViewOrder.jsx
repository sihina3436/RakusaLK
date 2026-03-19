import React, { useState } from "react";

const ViewOrder = ({ order, onClose, handleStatusChange }) => {
  const [showPaySlip, setShowPaySlip] = useState(false);

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-yellow-400/30 rounded-2xl max-w-3xl w-full p-6 shadow-lg relative overflow-y-auto max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400 text-3xl hover:text-yellow-300 transition"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
          Order Details
        </h2>

        {/* Customer Info & Shipping Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-300">
          <div>
            <p>
              <span className="text-yellow-400 font-semibold">Customer:</span>{" "}
              {order.user.username} ({order.user.email})
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">Order ID:</span>{" "}
              {order._id}
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">Total:</span> Rs.{" "}
              {order.totalAmount.toFixed(2)}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-400 font-semibold">Status:</span>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="bg-black border border-yellow-400 text-yellow-400 px-2 py-1 rounded-md focus:ring-1 focus:ring-yellow-400 transition"
              >
                {["pending", "processing", "shipped", "completed", "cancelled"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  )
                )}
              </select>
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold mb-1">Shipping Address</h3>
            <p className="text-gray-300 text-sm">
              {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} - {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Products */}
        <h3 className="text-yellow-400 font-semibold mb-2">Products</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 mb-4">
          {order.products.map((p) => (
            <div
              key={p._id}
              className="flex justify-between items-center bg-black/50 border border-yellow-400/20 rounded-lg p-2 hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-3">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded border border-yellow-400/20"
                  />
                )}
                <div>
                  <p className="text-white font-semibold">{p.name}</p>
                  <p className="text-gray-400 text-sm">
                    {p.quantity} × Rs. {p.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-yellow-400 font-bold">
                Rs. {(p.price * p.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* PaySlip Button */}
        {order.paySlip && (
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setShowPaySlip(true)}
              className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              View PaySlip
            </button>
            <span className="text-gray-400 text-sm">Click to verify payment</span>
          </div>
        )}

        {/* PaySlip Modal */}
        {showPaySlip && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaySlip(false)}
          >
            <div
              className="bg-black border border-yellow-400/40 rounded-2xl p-4 max-w-sm w-full shadow-lg relative"
              onClick={(e) => e.stopPropagation()} // Prevent close on modal click
            >
              <button
                onClick={() => setShowPaySlip(false)}
                className="absolute top-2 right-2 text-yellow-400 text-2xl hover:text-yellow-300 transition"
              >
                &times;
              </button>
              <img
                src={order.paySlip}
                alt="PaySlip"
                className="w-full h-64 object-contain rounded-md border border-yellow-400/30"
              />
              <p className="text-gray-300 text-center mt-2 text-sm">
                PaySlip verification
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;