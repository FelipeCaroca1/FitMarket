import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas */}
        <Route
          path="/shop"
          element={
            <PrivateRoutes>
              <Shop />
            </PrivateRoutes>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/cart" 
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
