import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Main/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers";
import Instructors from "../Pages/Instructors/Instructors";
import AddClass from "../Pages/Dashboard/AddClass";
import MyClass from "../Pages/Dashboard/MyClass";
import ManageClasses from "../Pages/Dashboard/ManageClasses";
import AllClasses from "../Pages/AllClasses/AllClasses";
import MySelectedClass from "../Pages/Dashboard/MySelectedClass";
import EnrolledClass from "../Pages/Dashboard/EnrolledClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <AllClasses></AllClasses>
      }
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
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>,
      },
      {
        path: "myClass",
        element: <MyClass></MyClass>,
      },
      {
        path: "manageClasses",
        element: <ManageClasses></ManageClasses>
      },
      {
        path: "selectedClass",
        element: <MySelectedClass></MySelectedClass>
      },
      {
        path: "enrolledClass",
        element: <EnrolledClass></EnrolledClass>
      }
    ],
  },
]);
