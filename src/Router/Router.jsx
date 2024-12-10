import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AddJob,
  AddNewProject,
  AddProject,
  ArchivedProjects,
  BusinessProjects,
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
  ProfilePage,
  ProjectBooks,
  Projects,
  Signup,
  ViewBusiness,
  ViewJob,
} from "../pages";
import ProtectedRoute, {
  ProtectedAdminRoute,
  ProtectedBusinessRoute,
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
  if (auth?.role === "admin" || (role && role === "admin"))
    return <ProjectBooks />;
  if (auth?.role === "client" || (role && role === "client"))
    return <ClientProjects />;
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
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/assignedProjects",
        element: <BusinessProjects />,
      },
      {
        path: "/projectbooks",
        element: (
          <ProtectedBusinessRoute>
            <ProjectsPriority />
          </ProtectedBusinessRoute>
        ),
        children: [
          {
            path: "projects/:id",
            element: (
              <ProtectedAdminRoute>
                <Projects />
              </ProtectedAdminRoute>
            ),
          },
          {
            path: "archivedProjects",
            element: <ArchivedProjects />,
          },
          {
            path: "addProject/:id",
            element: <AddProject />,
          },
          {
            path: "addNewProject",
            element: <AddNewProject />,
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
            path: "addJob/:id",
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
          <ProtectedAdminRoute>
            <Clients />
          </ProtectedAdminRoute>
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
          <ProtectedAdminRoute>
            <BusinessDirectory />
          </ProtectedAdminRoute>
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
