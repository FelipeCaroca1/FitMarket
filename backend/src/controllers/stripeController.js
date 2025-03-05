const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, 
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success?status=success",
            cancel_url: "http://localhost:5173/success?status=cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creando la sesión de checkout:", error);
        res.status(500).json({ message: "Error al procesar el pago" });
    }
};

module.exports = { createCheckoutSession };
