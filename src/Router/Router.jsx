import { createBrowserRouter } from "react-router-dom";
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
  EditJob,
  EditProject,
  JobBook,
  Login,
  PageNotFound,
  ProjectBooks,
  Projects,
  Signup,
  ViewBusiness,
  ViewJob,
} from "../pages";
import ProtectedRoute, {
  ProtectedClientRoute,
  ProtectedLoginSignupRoute,
} from "./ProtectedRoute";
import { getRoleFromLocalStorage } from "../utils/Storage/StorageUtils";
import useAuth from "../hooks/useAuth";
import { BusinessDashboard } from "../pages/Dashboard/BusinessDashboard";
import BusinessDirectory from "../pages/BusinessDirectory/BusinessDirectory";

const DashboardPriority = () => {
  const role = getRoleFromLocalStorage();
  const { auth } = useAuth();
  if (auth?.role === "admin" || (role && role === "admin"))
    return <Dashboard />;
  if (auth?.role === "client" || (role && role === "client"))
    return <ClientDashboard />;
  return <BusinessDashboard />;
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
            element: <Projects />,
          },
          {
            path: "archivedProjects",
            element: <ArchivedProjects />,
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
          {
            path: "editJob/:id",
            element: <EditJob />,
          },
          {
            path: "viewJob/:id",
            element: <ViewJob />,
          },
        ],
      },
      {
        path: "/clients",
        element: (
          <ProtectedClientRoute>
            <Clients />
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
