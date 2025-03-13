import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AboutUs from "./pages/AboutUs";
import Guides from "./pages/Guides";
import CartSidebar from "./components/CartSideBar";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      
      <CartSidebar />
      <Layout>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/guide" element={<Guides />} />


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
            path="/settings"
            element={
              <PrivateRoutes>
                <Settings />
              </PrivateRoutes>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoutes>
                <Checkout />
              </PrivateRoutes>
            }
          />
          <Route
            path="/success"
            element={
              <PrivateRoutes>
                <Success />
              </PrivateRoutes>
            }
          />
          <Route
            path="/cancel"
            element={
              <PrivateRoutes>
                <Cancel />
              </PrivateRoutes>
            }
          />
          <Route
            path="/privacy"
            element={
              <PrivateRoutes>
                <Privacy />
              </PrivateRoutes>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoutes>
                <Support />
              </PrivateRoutes>
            }
          />
        </Routes>
      </Layout>
    </Elements>
  );
}

export default App;
