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
import Profile from "../Pages/Dashboard/User/Profile/Profile";
import AddJob from "../Pages/Dashboard/User/AddJob/AddJob";
import AppliedJob from "../Pages/Dashboard/User/AppliedJob/AppliedJob";
import EditApplyJob from "../Pages/Dashboard/User/AppliedJob/EditApplyJob";
import ResumeCheck from "../Pages/Dashboard/User/ResumeCheck/ResumeCheck";
import CalendarPage from "../Pages/Dashboard/User/CalendarPage/CalendarPage";
import CalendarSuccess from "../Pages/Dashboard/User/CalendarPage/CalendarSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthenticaionLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/addJob",
        element: <AddJob />,
      },
      {
        path: "/dashboard/appliedJob",
        element: <AppliedJob />,
      },
      {
        path: "/dashboard/editJob/:id",
        element: <EditApplyJob />,
      },
      {
        path: "/dashboard/resumeCheck",
        element: <ResumeCheck />,
      },
      {
        path: "/dashboard/calendar",
        element: <CalendarPage />,
      },
      {
        path: "/dashboard/calendar-success",
        element: <CalendarSuccess />,
      },
    ],
  },
]);
export default router;
