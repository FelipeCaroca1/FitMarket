import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../components/Button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment("{CLIENT_SECRET}", {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.error("Error en el pago:", error);
    } else {
      console.log("Pago exitoso:", paymentIntent);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-background p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-red-500 text-center">Finalizar Compra</h2>
      <CardElement className="p-3 bg-gray-800 rounded-md text-white" />
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Procesando..." : "Pagar"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
