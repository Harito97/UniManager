import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContentProvider } from "./components/Notification/ContentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContentProvider>
    <App />
  </ContentProvider>,
);
