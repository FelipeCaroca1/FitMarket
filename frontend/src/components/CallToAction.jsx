import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      navigate("/shop"); 
    } else {
      navigate("/register"); 
    }
  };

  return (
    <section
      className="w-screen h-[400px] bg-cover bg-center relative flex flex-col justify-center items-center text-white text-center"
      style={{ backgroundImage: "url('/img/cta-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Únete a la comunidad FitMarket y alcanza tus metas
        </h2>
        <p className="text-lg mb-6">
          Descubre los mejores productos para potenciar tu rendimiento.
        </p>
        <Button
          onClick={handleButtonClick}
          className="relative z-10 px-6 py-3 text-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          {user ? "Explora la tienda" : "Regístrate ahora"}
        </Button>
  
        {!user && (
          <p className="mt-4 text-gray-300">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-red-400 hover:text-red-500 underline">
              Inicia sesión aquí
            </Link>
          </p>
        )}
      </div>
    </section>
  );
  
};

export default CallToAction;
