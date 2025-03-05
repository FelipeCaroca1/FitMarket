import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString();

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Por favor ingresa los datos de tu tarjeta antes de continuar.");
            return;
        }

        const { error: cardError } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (cardError) {
            setError("Datos de tarjeta inválidos. Verifica e intenta nuevamente.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItems }),
            });

            const session = await response.json();

            if (session.id) {
                stripe.redirectToCheckout({ sessionId: session.id });
            } else {
                setError("Error al crear la sesión de pago. Intenta nuevamente.");
                navigate("/cancel", { state: { paymentFailed: true } });
            }
        } catch (error) {
            console.error("Error en el proceso de pago:", error);
            setError("Error en el proceso de pago. Inténtalo de nuevo más tarde.");
            navigate("/cancel", { state: { paymentFailed: true } });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-10 text-white">
            <div className="container mx-auto p-5">
                <div className="flex justify-center">
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">
                        Procesar Pago
                    </h2>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start md:items-stretch">
                <div className="p-6 bg-black/80 rounded-lg shadow-md h-full flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-red-500 mb-4 text-center">Resumen de Compra</h3>
                    <div className="flex flex-col space-y-2">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between text-white">
                                <p className="text-left px-2">{item.name} x {item.quantity}</p>
                                <p className="text-red-500 font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4 border-gray-600" />
                    <p className="text-lg font-bold text-red-500 text-right">Total: ${totalAmount}</p>
                </div>

                <div className="p-6 bg-black/80 rounded-lg shadow-md h-full flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-red-500 mb-4 text-center">Finalizar compra</h3>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <CardElement
                        className="p-3 bg-background rounded-md w-full"
                        options={{
                            style: {
                                base: {
                                    color: "#ffffff", 
                                    "::placeholder": {
                                        color: "#cccccc", 
                                    },
                                },
                                invalid: {
                                    color: "#ff4d4d", 
                                },
                            },
                        }}
                    />
                    <Button
                        size="medium"
                        className="w-full mt-4 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Procesando..." : "Pagar"}
                    </Button>
                </div>
            </div>
            <div className="mt-6 text-center">
                <Button
                    size="medium"
                    className="border border-gray-600 text-gray-400 hover:bg-red-600 hover:text-white transition"
                    onClick={() => navigate("/cart")}
                >
                    Volver al Carrito
                </Button>
            </div>
        </div>
    );
};

export default Checkout;
