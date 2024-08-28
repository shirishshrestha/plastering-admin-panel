import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import {
  AddProject,
  ClientDashboard,
  Dashboard,
  Login,
  Projects,
  Signup,
  ViewProject,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import { getRoleFromLocalStorage } from "../utils/Storage/StorageUtils";

const role = getRoleFromLocalStorage();

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: role === "admin" ? <Dashboard /> : <ClientDashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
        children: [
          {
            path: "addProject",
            element: <AddProject />,
          },
          {
            path: "viewProject/:id",
            element: <ViewProject />,
          },
        ],
      },
      {
        path: "/client",
        element: <ClientDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
