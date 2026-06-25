import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router/router";
import { Provider } from "react-redux";
import StoreProvider from "./providers/StoreProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);

