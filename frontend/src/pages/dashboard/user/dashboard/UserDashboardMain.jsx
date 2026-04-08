import React from "react";
import { NavLink, useNavigate, Link, Outlet } from "react-router-dom";
import { useLogoutMutation } from "../../../../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../../redux/auth/authSlice";
import {
  FaChartPie,
  FaPlusCircle,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { path: "/dashboard/user/user", label: "Dashboard", icon: FaChartPie },
  { path: "/dashboard/user/orders", label: "Orders", icon: FaPlusCircle },
  { path: "/dashboard/user/manage-profile", label: "Manage Profile", icon: FaBoxOpen },
];

const UserDashboardMain = () => {
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-black text-white border border-yellow-500 rounded-4xl flex flex-col p-5">
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 text-center mb-6"
        >
          Rakusa<span className="text-white">.</span>
        </Link>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-yellow-400 text-black font-semibold"
                      : "text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400"
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-4 flex items-center justify-center gap-2 bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300 disabled:opacity-50"
        >
          <FaSignOutAlt />
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </aside>

      {/* Page content renders here */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardMain;