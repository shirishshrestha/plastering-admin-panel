import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Dashboard, Login, Projects } from "../pages";

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
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
