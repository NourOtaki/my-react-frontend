import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM from "react-dom/client";
// import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router/router";
import { Provider } from "react-redux";
// import { store } from "./store";
import StoreProvider from "./providers/StoreProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,

  // <StrictMode>
  //   <StoreProvider>
  //     <Provider store={store}>
  //       <RouterProvider router={router} />
  //     </Provider>
  //   </StoreProvider>
  // </StrictMode>,
);

