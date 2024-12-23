import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./Router/Router";
import { queryClient } from "./utils/Query/Query";
import { AuthProvider } from "./utils/Context/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
