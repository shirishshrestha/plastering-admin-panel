import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  AddProject,
  Dashboard,
  Login,
  Projects,
  Signup,
  ViewProject,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
