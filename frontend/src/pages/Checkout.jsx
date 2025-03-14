import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart.js";
import Button from "../components/Button.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";

const Checkout = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [holdTimeoutId, setHoldTimeoutId] = useState(null);
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    const updatedItem = cartItems.find(
      (i) => i._id === item._id && i.selectedSize === item.selectedSize
    );
    if (!updatedItem || updatedItem.quantity >= updatedItem.stock) return;
    addToCart({ ...updatedItem, quantity: 1 });
  };

  const handleDecrease = (item) => {
    const updatedItem = cartItems.find(
      (i) => i._id === item._id && i.selectedSize === item.selectedSize
    );
    if (!updatedItem || updatedItem.quantity <= 1) return;
    addToCart({ ...updatedItem, quantity: -1 });
  };

  const startHoldAction = (item) => {
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        const updatedItem = cartItems.find(
          (i) => i._id === item._id && i.selectedSize === item.selectedSize
        );
        if (!updatedItem || updatedItem.quantity >= updatedItem.stock) {
          stopHoldAction();
          return;
        }
        addToCart({ ...updatedItem, quantity: 1 });
      }, 100);
      setIntervalId(id);
    }, 600);
    setHoldTimeoutId(timeout);
  };

  const stopHoldAction = () => {
    clearTimeout(holdTimeoutId);
    clearInterval(intervalId);
    setHoldTimeoutId(null);
    setIntervalId(null);
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch("http://localhost:5000/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          userId: user?._id,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No se recibió una URL de Stripe.");
      }
    } catch (error) {
      console.error("Error al crear sesión de Stripe:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 text-white space-y-10">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mb-6 py-2">
        Resumen de compra
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-400">Tu carrito está vacío.</p>
          <Button
            size="medium"
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
            onClick={() => navigate("/shop")}
          >
            Ir a la Tienda
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          {cartItems.map((item) => (
            <div
              key={`${item._id}-${item.selectedSize}`}
              className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 py-8 space-y-6 md:space-y-0 md:space-x-6"
            >
              <div className="flex items-center gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  {item.selectedSize && <p className="text-gray-400">Talla: {item.selectedSize}</p>}
                  <p className="text-gray-400 text-lg">${(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-gray-500">Stock disponible: {item.stock}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <button
                    className={`p-2 px-4 rounded-l bg-transparent text-white border border-gray-600 transition ${item.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"}`}
                    onClick={() => handleDecrease(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="p-2 px-6 bg-[#2d2d2d] text-white border border-gray-600">{item.quantity}</span>
                  <button
                    className={`p-2 px-4 rounded-r bg-transparent text-white border border-gray-600 transition ${item.quantity >= item.stock ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
                    onClick={() => handleIncrease(item)}
                    onMouseDown={() => startHoldAction(item)}
                    onMouseUp={stopHoldAction}
                    onMouseLeave={stopHoldAction}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <Button
                  size="small"
                  className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                  onClick={() => removeFromCart({ _id: item._id, selectedSize: item.selectedSize })}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 space-y-6 md:space-y-0">
            <p className="text-xl font-bold text-white">
              Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
            </p>
            <Button
              size="medium"
              className="!text-white !border-green-600 hover:!bg-green-900 transition"
              onClick={handlePayment}
            >
              Proceder al Pago
            </Button>
          </div>
          <div className="mt-6 text-center">
            <Button
              size="medium"
              className="border border-gray-600 text-gray-400 hover:bg-red-600 hover:text-white transition"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Vaciar Carrito
            </Button>
          </div>
        </div>
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          title="Vaciar Carrito"
          message="¿Estás seguro de que quieres eliminar todos los productos de tu carrito?"
          onConfirm={() => {
            clearCart();
            setIsConfirmModalOpen(false);
          }}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Checkout;
