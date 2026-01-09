import { NavLink, useNavigate, Link } from "react-router-dom";
import { useLogoutMutation } from "../../../../redux/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../../../redux/auth/authSlice";
import {
  FaChartPie,
  FaPlusCircle,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaInbox,
  FaAddressBook,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard", icon: <FaChartPie /> },
  { path: "/dashboard/add-product", label: "Add Product", icon: <FaPlusCircle /> },
  { path: "/dashboard/manage-products", label: "Products", icon: <FaBoxOpen /> },
  { path: "/dashboard/users", label: "Users", icon: <FaUsers /> },
  { path: "/dashboard/manage-orders", label: "Orders", icon: <FaShoppingCart /> },
  { path: "/dashboard/chat-inbox", label: "Inbox", icon: <FaInbox /> },
  { path: "/dashboard/view-contacts", label: "Contacts", icon: <FaAddressBook /> },
];

const AdminDashboardMain = () => {
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logoutSuccess());
    navigate("/");
  };

  return (
    <aside className="h-screen bg-black text-white border border-yellow-500 rounded-4xl flex flex-col p-5">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold text-yellow-400 text-center mb-6">
        Rakusa<span className="text-white">.</span>
      </Link>

      {/* NAV */}
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
              ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-yellow-400/10 hover:text-yellow-400"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center justify-center gap-2 bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default AdminDashboardMain;
