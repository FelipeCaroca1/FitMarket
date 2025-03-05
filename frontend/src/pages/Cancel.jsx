import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Cancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Redirigiendo a /cancel desde Stripe...");
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">
                Pago Fallido
            </h2>
            <p className="text-lg text-gray-400 mb-4">
                Hubo un problema con tu pago. Inténtalo nuevamente o revisa tu información.
            </p>
            <Button
                size="medium"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                onClick={() => navigate("/cart")}
            >
                Volver al Carrito
            </Button>
        </div>
    );
};

export default Cancel;
