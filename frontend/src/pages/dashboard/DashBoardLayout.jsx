import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboardMain from "./admin/dashboard/AdminDashboardMain";
import UserDashboardMain from "./user/dashboard/UserDashboardMain";

const DashBoardLayout = () => {
  const { user } = useSelector((state) => state.auth);


  if (!user) {
    return <Navigate to="/" />;
  }

  const renderSidebar = () => {
    if (user.role === "seller") {
      return <AdminDashboardMain />;
    }

    if (user.role === "user") {
      return <UserDashboardMain />;
    }

    return <Navigate to="/" />;
  };

  return (
    <div className="h-screen flex bg-[#0a0a0a] overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 shrink-0 p-3 overflow-y-auto">
        {renderSidebar()}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
