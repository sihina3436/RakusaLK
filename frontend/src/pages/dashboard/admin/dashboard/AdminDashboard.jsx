import { useGetSellerStatsQuery } from "../../../../redux/stats/statsApi";
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
  FaUsers,
  FaStore,
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

/* STAT CARD */
const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-black rounded-xl border border-yellow-500/30">
    <div className="p-3 bg-yellow-400 text-black rounded-lg text-lg">
      {icon}
    </div>
    <div>
      <p className="text-xs text-yellow-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data, isLoading } = useGetSellerStatsQuery();

  if (isLoading) {
    return <p className="text-yellow-400">Loading...</p>;
  }

  const orderStatusData = {
    labels: data.ordersByStatus.map((o) => o._id),
    datasets: [
      {
        data: data.ordersByStatus.map((o) => o.count),
        backgroundColor: ["#FACC15", "#EAB308", "#CA8A04"],
        borderWidth: 0,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: data.monthlyRevenue.map(
      (m) => `${m._id.year}-${m._id.month}`
    ),
    datasets: [
      {
        data: data.monthlyRevenue.map((m) => m.total),
        backgroundColor: "#FACC15",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-6 ">
      <h1 className="text-xl font-bold text-yellow-400">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={<FaUsers />} label="Users" value={data.totalUsers} />
        <StatCard icon={<FaStore />} label="Sellers" value={data.totalSellers} />
        <StatCard icon={<FaBoxOpen />} label="Products" value={data.totalProducts} />
        <StatCard icon={<FaShoppingCart />} label="Orders" value={data.totalOrders} />
        <StatCard
          icon={<FaMoneyBillWave />}
          label="Revenue"
          value={`Rs. ${data.totalRevenue.toLocaleString()}`}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black p-4 rounded-xl border border-yellow-500/30">
          <h2 className="text-sm text-yellow-400 mb-2">Order Status</h2>
          <div className="h-56">
            <Doughnut
              data={orderStatusData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#FACC15", font: { size: 11 } },
                  },
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div className="bg-black p-4 rounded-xl border border-yellow-500/30">
          <h2 className="text-sm text-yellow-400 mb-2">Monthly Revenue</h2>
          <div className="h-56">
            <Bar
              data={monthlyRevenueData}
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
    </div>
  );
};

export default AdminDashboard;
