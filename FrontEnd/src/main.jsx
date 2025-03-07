import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider
import { TicketProvider } from "./context/TicketContext"; // ✅ Import TicketProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
      <AuthProvider>
        <TicketProvider> {/* ✅ Wrap App inside TicketProvider */}
          <App />
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
