import React from "react";
import ReactDOM from "react-dom/client";
import projectRoute from "./projectRoute";
import { RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";

const result = ReactDOM.createRoot(document.getElementById("root"));

result.render(<RouterProvider router={projectRoute} />);
