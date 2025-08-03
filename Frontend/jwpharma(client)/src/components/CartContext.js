import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (medicine) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("❌ User ID is missing.");
        setNotification("User not logged in.");
        return;
      }

      console.log("🛒 Adding to cart for User ID:", userId);
      console.log("📦 Medicine Data:", medicine);

      const formData = new FormData();
      formData.append("name", medicine.name || "");
      formData.append("price", medicine.price || 0);
      formData.append("category", medicine.category || "");
      formData.append("manufacturer", medicine.manufacturer || "");

      // Check if the image is base64
      if (medicine.image && medicine.image.startsWith("data:image")) {
        console.log("🖼️ Processing base64 image...");
        const byteCharacters = atob(medicine.image.split(",")[1]); // Remove base64 prefix
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const imageBlob = new Blob([byteArray], { type: "image/jpeg" });

        formData.append("image", imageBlob, "medicine.jpg");
      } else {
        console.warn("⚠️ No valid image provided. Skipping image upload.");
        formData.append("image", new Blob(), "empty.jpg"); // Send an empty file
      }

      // Make API request
      const response = await fetch(
        `http://localhost:9000/api/cart/add/${userId}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token
          },
        }
      );

      // Log response status
      console.log("📡 API Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Cart Updated:", result);
      setNotification("Added to cart successfully!");
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      setNotification("Failed to add to cart");
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setNotification("Item removed from cart");
    setTimeout(() => setNotification(""), 3000);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setNotification("Cart cleared");
    setTimeout(() => setNotification(""), 3000);
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        setNotification,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
