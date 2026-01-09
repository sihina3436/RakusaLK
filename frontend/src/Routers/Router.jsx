import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/home/Contact";
import About from "../components/About";
import Shop from "../pages/shop/Shop";
import Login from "../components/Login";
import Register from "../components/Register";

import DashBoardLayout from "../pages/dashboard/DashBoardLayout";
import AdminDashboard from "../pages/dashboard/admin/dashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "shop", element: <Shop /> },
    ],
  },

  /* ======================
     AUTH ROUTES
     ====================== */
  { path: "/login", element: <Login /> },
  { path: "/register", element: <DashBoardLayout /> },

  /* ======================
     DASHBOARD ROUTES
     ====================== */
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      /* -------- USER -------- */
      { path: "user/profile", element: <div>User Profile Page</div> },

      /* -------- ADMIN -------- */
      { path: "admin", element: <AdminDashboard /> },
      { path: "add-product", element: <div>Add Product Page</div> },
      { path: "manage-products", element: <div>Manage Products Page</div> },
      { path: "users", element: <div>Users Page</div> },
      { path: "manage-orders", element: <div>Manage Orders Page</div> },
      { path: "chat-inbox", element: <div>Chat Inbox Page</div> },
      { path: "view-contacts", element: <div>Contacts Page</div> },
      { path: "colors", element: <div>Colors Page</div> },
    ],
  },
]);

export default router;
