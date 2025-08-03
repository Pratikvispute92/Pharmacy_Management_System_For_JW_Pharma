import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Cart from "./components/Cart";
import App from "./components/App";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Product from "./components/products/Product";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import { CartProvider } from "./components/CartContext";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import TrackingOrder from "./components/TrackingOrder";
import ProductDetails from "./components/products/productDetails";

const projectRoute = createBrowserRouter([
  {
    path: "",
    element: (
      <CartProvider>
        <App />
      </CartProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/homepage" replace />,
      },
      {
        path: "homepage",
        element: <Home />,
      },
      {
        path: "loginpage",
        element: <Login />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/edit",
        element: <Edit />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/contactUs",
        element: <Contact />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orderHistory",
        element: <OrderHistory />,
      },
      {
        path: "/trackingOrder",
        element: <TrackingOrder />,
      },
    ],
  },
]);

export default projectRoute;
