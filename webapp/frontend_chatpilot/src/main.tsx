import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeToggleProvider from "./context/ThemeToggle.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeToggleProvider>
    <App />
  </ThemeToggleProvider>
  // </StrictMode>
);
