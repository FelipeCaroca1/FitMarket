import { useContext } from "react";
import CartContext from "../context/CartContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleIncrease = (item) => {
        addToCart({ ...item, quantity: 1 });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            removeFromCart({ _id: item._id, selectedSize: item.selectedSize });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 text-white space-y-10">
            <h2 className="text-3xl font-bold text-red-500 mb-10 text-center">Carrito de Compras</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center">Tu carrito está vacío.</p>
            ) : (
                <div className="space-y-10">
                    {cartItems.map((item) => (
                        <div key={`${item._id}-${item.selectedSize}`} className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 py-8 space-y-6 md:space-y-0 md:space-x-6">
                            <div className="flex items-center gap-6">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                <div>
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p className="text-gray-400">Talla: {item.selectedSize}</p>
                                    <p className="text-gray-400 text-lg">${item.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 px-4 rounded-l bg-transparent text-white border border-gray-600 hover:bg-red-500 transition" onClick={() => handleDecrease(item)}>-</button>
                                    <span className="p-2 px-6 bg-[#2d2d2d] text-white border border-gray-600">{item.quantity}</span>
                                    <button className="p-2 px-4 rounded-r bg-transparent text-white border border-gray-600 hover:bg-red-500 transition" onClick={() => handleIncrease(item)}>+</button>
                                </div>
                                <Button size="small" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition" onClick={() => removeFromCart({ _id: item._id, selectedSize: item.selectedSize })}>
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 space-y-6 md:space-y-0">
                        <p className="text-xl font-bold text-red-500">Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</p>
                        <Button size="medium" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition" onClick={() => navigate("/checkout")}>
                            Proceder al Pago
                        </Button>
                    </div>
                    <div className="mt-6 text-center">
                        <Button size="medium" className="border border-gray-600 text-gray-400 hover:bg-red-600 hover:text-white transition" onClick={clearCart}>
                            Vaciar Carrito
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
