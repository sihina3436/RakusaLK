import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/home/Contact";
import About from "../components/about";
import FAQ from "../components/FAQ";
import Shop from "../pages/shop/Shop";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import SizeGuide from "../components/SizeGuide";
import Shipping from "../components/Shipping";
import Privacy from "../components/Privacy";
import Terms from "../components/Terms";
import Search from "../components/Search";
import Cart from "../pages/Cart";
import DashBoardLayout from "../pages/dashboard/DashBoardLayout";
import AdminDashboard from "../pages/dashboard/admin/dashboard/AdminDashboard";
import ProductDetail from "../pages/shop/product/ProductDetail";
import AddSize from "../pages/dashboard/admin/addSize/AddSize";
import AddCategoryAndSubcategory from "../pages/dashboard/admin/addCategory/AddCategoryAndSubcategory";
import ManageColors from "../pages/dashboard/admin/colors/manageColors";
import OrdersManagement from "../pages/dashboard/admin/manageOrders/OrdersManagement";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProducts from "../pages/dashboard/admin/manageProduct/ManageProducts";
import EditProduct from "../pages/dashboard/admin/manageProduct/EditProduct";
import ManageUsers from "../pages/dashboard/admin/manageUsers/ManageUsers";
import UserDashboard from "../pages/dashboard/user/dashboard/UserDashboard";
import UserOrders from "../pages/dashboard/user/order/UserOrders";
import ManageProfile from "../pages/dashboard/user/profile/ManageProfile";
import UserDashboardMain from "../pages/dashboard/user/dashboard/UserDashboardMain";
import PrivateRoute from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "search", element: <Search /> },
      { path: "cart", element: <Cart /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  /* ======================
     DASHBOARD ROUTES
     ====================== */
  {
    path: "/dashboard",
    element: <PrivateRoute role="seller"><DashBoardLayout /></PrivateRoute>,
    children: [
      { path: "admin", element: <PrivateRoute role="seller"><AdminDashboard /></PrivateRoute> },
      { path: "add-product", element: <PrivateRoute role="seller"><AddProduct /></PrivateRoute> },
      { path: "manage-products", element: <PrivateRoute role="seller"><ManageProducts /></PrivateRoute> },
      { path: "edit-product/:id", element: <PrivateRoute role="seller"><EditProduct /></PrivateRoute> },
      { path: "users", element: <PrivateRoute role="seller"><ManageUsers /></PrivateRoute> },
      { path: "manage-orders", element: <PrivateRoute role="seller"><OrdersManagement /></PrivateRoute> },
      { path: "add-size", element: <PrivateRoute role="seller"><AddSize /></PrivateRoute> },
      { path: "add-categories", element: <PrivateRoute role="seller"><AddCategoryAndSubcategory /></PrivateRoute> },
      { path: "add-colors", element: <PrivateRoute role="seller"><ManageColors /></PrivateRoute> },
    ],
  },

  /* ======================
     USER DASHBOARD ROUTES
     ====================== */
  {
    path: "/dashboard/user",
    element: <PrivateRoute role="user"><UserDashboardMain /></PrivateRoute>,
    children: [
      { path: "user", element: <PrivateRoute role="user"><UserDashboard /></PrivateRoute> },
      { path: "orders", element: <PrivateRoute role="user"><UserOrders /></PrivateRoute> },
      { path: "manage-profile", element: <PrivateRoute role="user"><ManageProfile /></PrivateRoute> },
    ],
  },

  /* ======================
     STATIC PAGES
     ====================== */
  { path: "/faq", element: <FAQ /> },
  { path: "/size-guide", element: <SizeGuide /> },
  { path: "/shipping", element: <Shipping /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
]);

export default router;