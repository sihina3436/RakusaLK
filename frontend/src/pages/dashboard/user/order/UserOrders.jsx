import React, { useMemo } from "react";
import { useGetUserOrdersQuery } from "../../../../redux/order/orderApi";
import { useGetAllColorsQuery } from "../../../../redux/color/colorApi";
import { useGetAllSizesQuery } from "../../../../redux/size/sizeAPI";
import { FaBoxOpen } from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30",
    processing: "bg-blue-500/20 text-blue-400 border border-blue-400/30",
    shipped: "bg-purple-500/20 text-purple-400 border border-purple-400/30",
    completed: "bg-green-500/20 text-green-400 border border-green-400/30",
    cancelled: "bg-red-500/20 text-red-400 border border-red-400/30",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium backdrop-blur-md ${styles[status] || "bg-zinc-700 text-white"}`}
    >
      {status}
    </span>
  );
};

const UserOrders = () => {
  const { data: orders = [], isLoading } = useGetUserOrdersQuery();
  const { data: colors = [] } = useGetAllColorsQuery();
  const { data: sizes = [] } = useGetAllSizesQuery();

  const colorMap = useMemo(() => {
    const map = {};
    colors.forEach((c) => (map[c._id] = c));
    return map;
  }, [colors]);

  const sizeMap = useMemo(() => {
    const map = {};
    sizes.forEach((s) => (map[s._id] = s));
    return map;
  }, [sizes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-zinc-400 animate-pulse">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-zinc-500">
        <FaBoxOpen className="text-5xl mb-4 text-zinc-600" />
        <p className="text-lg">No orders yet</p>
        <p className="text-sm text-zinc-600">
          When you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-semibold text-white tracking-tight">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
            bg-gradient-to-br from-zinc-900/70 to-zinc-800/40
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
            transition hover:shadow-2xl hover:scale-[1.01]
          "
        >
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-zinc-400">
                Order ID
              </p>
              <p className="text-lg font-mono text-white tracking-wider">
                #{order._id.slice(-6)}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <StatusBadge status={order.status} />
              <p className="text-xl font-semibold text-white">
                Rs. {order.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">
            {order.products.map((item, index) => {
              const color = colorMap[item.color];
              const size = sizeMap[item.size];

              return (
                <div
                  key={index}
                  className="
                    flex flex-col md:flex-row md:items-center gap-4
                    bg-zinc-900/60
                    border border-white/5
                    rounded-2xl
                    p-4
                    hover:bg-zinc-800/60
                    transition
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="
                      w-20 h-20 rounded-xl object-cover
                      border border-white/10
                    "
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-zinc-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {size && (
                        <span className="px-2 py-1 text-xs rounded-lg bg-white/10 text-white">
                          {size.name}
                        </span>
                      )}

                      {color && (
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          {color.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="text-right">
                    <p className="text-white font-semibold text-lg">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Rs. {item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
