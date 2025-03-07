import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser"; 
import useAuth from "../hooks/useAuth"; 
import Button from "../components/Button";

const CallToAction = () => {
  const { userProfile } = useUser(); 
  const { user } = useAuth();  
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Regístrate ahora");

  useEffect(() => {
    if (user) {
      setButtonText("Explora la tienda");
    } else if (userProfile) {
      setButtonText("Inicia sesión");
    } else {
      setButtonText("Regístrate ahora");
    }
  }, [user, userProfile]);

  const handleButtonClick = () => {
    if (!userProfile) {
      navigate("/register");
    } else if (!user) {
      navigate("/login");
    } else {
      navigate("/shop");
    }
  };

  return (
    <section
      className="relative w-full h-[400px] flex flex-col justify-center items-center text-white text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/cta-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-2xl px-6">
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
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
