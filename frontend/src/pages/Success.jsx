import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">
                ¡Pago Exitoso!
            </h2>
            <p className="text-lg text-gray-400 mb-4">
                Tu compra ha sido procesada correctamente. 🎉
            </p>
            <p className="text-gray-500 mb-6">Recibirás un correo con los detalles de tu compra.</p>
            
            <Button 
                size="medium" 
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition" 
                onClick={() => navigate("/shop")}
            >
                Volver a la Tienda
            </Button>
        </div>
    );
};

export default Success;
