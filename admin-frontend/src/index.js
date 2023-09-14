import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import StoreItemPage from "./pages/StoreItemPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/store/:storeItemId",
    element: <StoreItemPage />,
    errorElement: <NotFound />,
  },
]);
const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

root.render(<RouterProvider router={router} />);
