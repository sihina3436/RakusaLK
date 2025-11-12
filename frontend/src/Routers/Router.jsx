import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/home/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: '/', element:<Home/>},  
        {path: '/contact', element: <Contact/>},
        {path: '/about', element: <div>About</div>},
    ],
  },
]);

export default router;
