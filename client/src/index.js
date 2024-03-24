import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App />,
  },
  {
    path: "/",
    element: <Navigate to={`${+new Date() + Math.floor(Math.random())}`} />,
  },
]);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
