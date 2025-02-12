import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas (aún sin páginas definidas) */}
        <Route
          path="/ruta-protegida"
          element={
            <PrivateRoutes>
              <h1>Página Protegida (Placeholder)</h1>
            </PrivateRoutes>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
