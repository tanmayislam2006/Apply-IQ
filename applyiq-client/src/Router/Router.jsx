import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import AuthenticaionLayout from "../Layout/AuthenticaionLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PrivateRouter from "./PrivateRouter";

const router =createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
            },
        ]
    },
    {
        path:"/",
        element:<AuthenticaionLayout/>,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path:"/dashboard",
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
    }
])
export default router;