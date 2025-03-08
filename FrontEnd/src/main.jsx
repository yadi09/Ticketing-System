import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TicketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TicketProvider>
    </BrowserRouter>
  </StrictMode>
);
