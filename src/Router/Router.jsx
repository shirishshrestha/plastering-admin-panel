import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import {
  AddJob,
  AddProject,
  ArchivedProjects,
  BusinessSignup,
  ClientDashboard,
  ClientProjects,
  Clients,
  Dashboard,
  EditBusiness,
  EditClient,
  EditProject,
  JobBook,
  Login,
  PageNotFound,
  ProjectBooks,
  Projects,
  Signup,
  ViewBusiness,
} from "../pages";
import ProtectedRoute, {
  ProtectedClientRoute,
  ProtectedLoginSignupRoute,
} from "./ProtectedRoute";
import { getRoleFromLocalStorage } from "../utils/Storage/StorageUtils";
import useAuth from "../hooks/useAuth";
import { BusinessDashboard } from "../pages/Dashboard/BusinessDashboard";
import BusinessDirectory from "../pages/BusinessDirectory/BusinessDirectory";
import { SearchProvider } from "../utils/Context/SearchProvider";

const DashboardPriority = () => {
  const role = getRoleFromLocalStorage();
  const { auth } = useAuth();
  return auth?.role === "admin" || (role && role === "admin") ? (
    <Dashboard />
  ) : auth?.role === "client" || (role && role === "client") ? (
    <ClientDashboard />
  ) : (
    <BusinessDashboard />
  );
};

const ProjectsPriority = () => {
  const role = getRoleFromLocalStorage();
  const { auth } = useAuth();
  return auth?.role === "admin" || (role && role === "admin") ? (
    <ProjectBooks />
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
        path: "/projectbooks",
        element: <ProjectsPriority />,
        children: [
          {
            index: true,
            element: <ProjectsPriority />,
          },
          {
            path: "projects",
            element: (
              <SearchProvider>
                <Projects />
              </SearchProvider>
            ),
          },
          {
            path: "archivedProjects",
            element: (
              <SearchProvider>
                <ArchivedProjects />
              </SearchProvider>
            ),
          },
          {
            path: "addProject",
            element: <AddProject />,
          },
          {
            path: "editProject/:id",
            element: <EditProject />,
          },
          {
            path: "jobBook/:id",
            element: <JobBook />,
          },
          {
            path: "addJob",
            element: <AddJob />,
          },
        ],
      },
      {
        path: "/clients",
        element: (
          <ProtectedClientRoute>
            <SearchProvider>
              <Clients />
            </SearchProvider>
          </ProtectedClientRoute>
        ),
        children: [
          {
            path: "editClient/:id",
            element: <EditClient />,
          },
        ],
      },
      {
        path: "/business",
        element: (
          <ProtectedClientRoute>
            <BusinessDirectory />
          </ProtectedClientRoute>
        ),
        children: [
          {
            path: "viewBusiness/:id",
            element: <ViewBusiness />,
          },
          {
            path: "editBusiness/:id",
            element: <EditBusiness />,
          },
        ],
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
  {
    path: "/businessSignup",
    element: (
      <ProtectedLoginSignupRoute>
        <BusinessSignup />
      </ProtectedLoginSignupRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
