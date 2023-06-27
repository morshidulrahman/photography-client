import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import App from "../App";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import AllClasses from "../Pages/AllClasses";
import AllInstructor from "../Pages/AllInstructor";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import SelectedClass from "../Pages/Dashboard/SelectedClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses";
import AddClass from "../Pages/Dashboard/Instructor/AddClass";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import PrivateAdminRoute from "./PrivateAdminRoute";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses";
import Manageclasses from "../Pages/Dashboard/Admin/ManageClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import NotfoundPages from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotfoundPages />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "allclasses",
        element: <AllClasses />,
      },
      {
        path: "allinstructor",
        element: <AllInstructor />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myselected",
        element: <SelectedClass />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "enrollclasses",
        element: <EnrolledClasses />,
      },
      {
        path: "addclass",
        element: <AddClass />,
      },
      {
        path: "myclasses",
        element: <MyClasses />,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory />,
      },
      {
        path: "allusers",
        element: (
          <PrivateAdminRoute>
            <AllUsers />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "manageclasses",
        element: (
          <PrivateAdminRoute>
            <Manageclasses />
          </PrivateAdminRoute>
        ),
      },
    ],
  },
]);
