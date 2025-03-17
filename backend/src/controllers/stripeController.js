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

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Usuario no autenticado: req.user.id no disponible" });
    }

    const lineItems = cartItems.map((item) => ({
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
      success_url: "https://fitmarket-frontend.onrender.com/success",
      cancel_url: "https://fitmarket-frontend.onrender.com/cancel",
      metadata: {
        userId: req.user.id,
        cartItems: JSON.stringify(
          cartItems.map(item => ({
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    if (!session || !session.url) {
      return res.status(500).json({ message: "No se recibió URL de Stripe" });
    }

    res.json({ url: session.url });

  } catch (error) {
    console.error("❌ Error creando sesión de checkout:", error.message);
    return res.status(500).json({ message: "Error al crear sesión de Stripe", error: error.message });
  }
};

module.exports = { createCheckoutSession };
