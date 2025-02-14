import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importamos el contexto
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Ahora envuelve todo */}
      <AuthProvider> {/* ✅ Ahora está dentro del BrowserRouter */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
