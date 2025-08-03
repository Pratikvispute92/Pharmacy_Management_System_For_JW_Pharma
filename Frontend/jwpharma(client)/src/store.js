// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer.js";

const store = configureStore({
  reducer: rootReducer, // Using rootReducer here
});

export default store;
