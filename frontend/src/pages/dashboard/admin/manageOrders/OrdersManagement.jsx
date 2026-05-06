import React, { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllSellerOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "../../../../redux/order/orderApi";
import ViewOrder from "./ViewOrder";

const OrdersManagement = () => {
  const { data: orders, isLoading, error } = useGetAllSellerOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Delete this order permanently?")) return;
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete order");
    }
  };

  if (isLoading)
    return <p className="text-zinc-400 text-center mt-10">Loading orders...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">Failed to load orders</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-100">
        Orders Management
      </h1>

      <div className="overflow-x-auto rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 shadow-md">
        <table className="min-w-full text-sm text-left text-zinc-300">

          <thead className="bg-zinc-800/70 text-zinc-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order) => (
              <tr
                key={order._id}
                className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="px-6 py-4 font-mono text-amber-400">
                  #{order._id.slice(-6)}
                </td>

                <td className="px-6 py-4">{order.user.username}</td>

                <td className="px-6 py-4 text-zinc-400">
                  {order.products.map((p) => (
                    <div key={p._id}>
                      {p.name} × {p.quantity}
                    </div>
                  ))}
                </td>

                <td className="px-6 py-4 font-semibold text-amber-400">
                  LKR {order.totalAmount.toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={selectedStatus[order._id] || order.status}
                    onChange={(e) => {
                      setSelectedStatus({
                        ...selectedStatus,
                        [order._id]: e.target.value,
                      });
                      handleStatusChange(order._id, e.target.value);
                    }}
                    className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-1 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                  >
                    {["pending", "processing", "shipped", "completed", "cancelled"].map(
                      (status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="rounded-lg bg-amber-400 px-3 py-1 text-sm font-semibold text-zinc-900 hover:bg-amber-500 transition-all"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(order._id)}
                    className="rounded-lg border border-red-500 text-red-500 px-3 py-1 text-sm hover:bg-red-500 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {selectedOrder && (
        <ViewOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          handleStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default OrdersManagement;
