import { useGetUserStatsQuery } from "../../../../redux/stats/statsApi";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

/* PREMIUM STAT CARD */
const StatCard = ({ icon, label, value }) => (
  <div className="group relative bg-zinc-900/70 backdrop-blur-xl 
    border border-zinc-800 rounded-2xl p-6 
    hover:border-amber-400/40 transition-all duration-300
    hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]">

    <div className="flex items-center gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-br 
        from-amber-400 to-yellow-500 text-black text-xl
        shadow-md group-hover:scale-110 transition">
        {icon}
      </div>

      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold text-white mt-1">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const UserDashboard = () => {
  const { data, isLoading } = useGetUserStatsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 text-lg bg-black">
        Loading Dashboard...
      </div>
    );
  }

  const orderStatusData = {
    labels: data.ordersByStatus.map((o) => o._id),
    datasets: [
      {
        data: data.ordersByStatus.map((o) => o.count),
        backgroundColor: ["#FACC15", "#EAB308", "#CA8A04", "#A16207"],
        borderWidth: 0,
      },
    ],
  };

  const ordersBarData = {
    labels: data.ordersByStatus.map((o) => o._id),
    datasets: [
      {
        data: data.ordersByStatus.map((o) => o.count),
        backgroundColor: "#FACC15",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r 
          from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Welcome Back 👋
        </h1>
        <p className="text-zinc-500 text-sm">
          Here’s your account overview
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaShoppingCart />}
          label="Total Orders"
          value={data.totalOrders}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          label="Total Spent"
          value={`Rs. ${data.totalSpent.toLocaleString()}`}
        />
        <StatCard
          icon={<FaCheckCircle />}
          label="Completed Orders"
          value={
            data.ordersByStatus.find((o) => o._id === "completed")?.count || 0
          }
        />
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* DOUGHNUT */}
        <div className="bg-zinc-900/70 backdrop-blur-xl 
          p-6 rounded-2xl border border-zinc-800 
          hover:border-amber-400/30 transition shadow-lg">

          <h2 className="text-sm text-amber-400 mb-4 uppercase tracking-wider">
            Orders by Status
          </h2>

          <div className="h-64">
            <Doughnut
              data={orderStatusData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#FACC15", font: { size: 12 } },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        {/* BAR */}
        <div className="bg-zinc-900/70 backdrop-blur-xl 
          p-6 rounded-2xl border border-zinc-800 
          hover:border-amber-400/30 transition shadow-lg">

          <h2 className="text-sm text-amber-400 mb-4 uppercase tracking-wider">
            Orders Overview
          </h2>

          <div className="h-64">
            <Bar
              data={ordersBarData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: "#FACC15" } },
                  y: { ticks: { color: "#FACC15" } },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* MODERN RECENT ORDERS */}
      {data.recentOrders.length > 0 && (
        <div className="bg-zinc-900/70 backdrop-blur-xl 
          p-6 rounded-2xl border border-zinc-800 shadow-lg">

          <h2 className="text-sm text-amber-400 mb-6 uppercase tracking-wider">
            Recent Orders
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {data.recentOrders.map((order) => (
              <div
                key={order._id}
                className="group bg-black border border-zinc-800 
                  rounded-xl p-5 hover:border-amber-400/40 
                  hover:shadow-[0_0_15px_rgba(250,204,21,0.15)] 
                  transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="font-mono text-amber-400 text-sm">
                    #{order._id.slice(-6)}
                  </p>

                  <span className="text-xs px-3 py-1 rounded-full 
                    bg-amber-400 text-black font-semibold">
                    {order.status}
                  </span>
                </div>

                <p className="text-zinc-400 text-xs mt-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xl font-bold text-white mt-4">
                  Rs. {order.totalAmount.toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  );
};

export default UserDashboard;
