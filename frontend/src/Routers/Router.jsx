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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: '/', element:<Home/>},  
        {path: '/contact', element: <Contact/>},
        {path: '/about', element: <About/>},
        {path: '/shop', element: <Shop/>},
        {path: '/signup', element: <SignUp/>},
        {path: '/login', element: <Login/>},
        {path: '/forgot-password', element: <ForgotPassword/>},
        {path: '/search', element: <Search/>},
        {path: '/cart', element: <Cart/>},
    ],
  },
  {
    path: "/faq",
    element: <FAQ/>
  },
  {
    path: "/size-guide",
    element: <SizeGuide/>
  },
  {
    path: "/shipping",
    element: <Shipping/>
  },
  {
    path: "/privacy",
    element: <Privacy/>
  },
  {
    path: "/terms",
    element: <Terms/>
  },
]);

export default router;
