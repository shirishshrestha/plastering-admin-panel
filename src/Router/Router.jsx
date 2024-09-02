import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import {
  AddProject,
  ClientDashboard,
  ClientProjects,
  Dashboard,
  Login,
  Projects,
  Signup,
  ViewProject,
} from "../pages";
import ProtectedRoute, { ProtectedLoginSignupRoute } from "./ProtectedRoute";
import { getRoleFromLocalStorage } from "../utils/Storage/StorageUtils";
import useAuth from "../hooks/useAuth";

const DashboardPriority = () => {
  const role = getRoleFromLocalStorage();
  const { auth } = useAuth();
  return auth?.role === "admin" || (role && role === "admin") ? (
    <Dashboard />
  ) : (
    <ClientDashboard />
  );
};

const ProjectsPriority = () => {
  const role = getRoleFromLocalStorage();
  const { auth } = useAuth();
  return auth?.role === "admin" || (role && role === "admin") ? (
    <Projects />
  ) : (
    <ClientProjects />
  );
};

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
        element: <DashboardPriority />,
      },
      {
        path: "/projects",
        element: <ProjectsPriority />,
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
    element: (
      <ProtectedLoginSignupRoute>
        <Login />
      </ProtectedLoginSignupRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedLoginSignupRoute>
        <Signup />
      </ProtectedLoginSignupRoute>
    ),
  },
]);
