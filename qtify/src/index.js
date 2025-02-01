import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import AlbumPage from "./components/AlbumPage/AlbumPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/album/:albumId",
        element: <AlbumPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </StyledEngineProvider>
);

// console.clear();
// to clear all consoles warnings error anything
console.log = console.warn = console.error = () => {};
