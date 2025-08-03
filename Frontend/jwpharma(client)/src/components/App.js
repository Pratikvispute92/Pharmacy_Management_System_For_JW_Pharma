import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { CartContext } from "./CartContext";
import Nav from "./Nav";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

function App(props) {
  const { notification } = useContext(CartContext);
  return (
    <div id="root">
      {notification && <div className="notification">{notification}</div>}
      <Nav />
      <Chatbot />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
