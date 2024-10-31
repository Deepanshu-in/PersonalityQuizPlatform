import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store"; // Import the Redux store
import App from "./App";
import { ToastContainer } from "react-toastify";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer limit={1} />
      <App />
    </Provider>
  </React.StrictMode>
);
