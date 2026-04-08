import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboardMain from "./admin/dashboard/AdminDashboardMain";
import UserDashboardMain from "./user/dashboard/UserDashboardMain";

const DashBoardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/" />;

  const Sidebar = () => {
    if (user.role === "seller") return <AdminDashboardMain />;
    if (user.role === "user") return <UserDashboardMain />;
    return <Navigate to="/" />;
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
