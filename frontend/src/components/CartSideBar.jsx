import { useContext } from "react";
import CartContext from "../context/CartContext";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const CartSidebar = () => {
  const { isCartOpen, closeCart, cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    closeCart();
    navigate("/checkout");
    
  };

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background z-50 transform transition-transform duration-300 ease-in-out shadow-[rgba(220,38,38,0.3)_-10px_0px_12px] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-textSecondary">
          <h2 className="text-lg font-bold text-textPrimary">Carrito de compras</h2>
          <button onClick={closeCart}>
            <FiX className="text-2xl text-textPrimary hover:text-red-500 transition" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 pl-5 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <p className="text-textSecondary">Tu carrito está vacío.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 border border-textSecondary rounded p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border border-textSecondary"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-textPrimary">{item.name}</p>
                  {item.selectedSize && (
                    <p className="text-sm text-textSecondary">Talla: {item.selectedSize}</p>
                  )}
                  <p className="text-sm text-textSecondary">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-bold text-textPrimary">x{item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-textSecondary space-y-2">
            <Button size="small" className="text-green-600 border-green-600 hover:bg-green-900 w-full" onClick={handleProceedToCheckout}>
              Proceder al pago
            </Button>
            <Button
              size="small"
              onClick={() => {
                clearCart();
                closeCart();
              }}
              className="w-full bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Vaciar carrito
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
