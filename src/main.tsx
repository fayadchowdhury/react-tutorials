import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css' # Use bootstrap instead
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import "./index.css"; // Global CSS file

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
