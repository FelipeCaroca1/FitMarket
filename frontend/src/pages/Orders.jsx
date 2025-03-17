import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeFilter, setTimeFilter] = useState("all");
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No se encontró token de autenticación.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://fitmarket-mjna.onrender.com/api/orders/history", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error al cargar el historial de compras.");
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleRepeatOrder = (products) => {
        products.forEach((item) => {
            const product = {
                ...item.product,
                price: item.price,
                quantity: item.quantity || 1,
                selectedSize: item.selectedSize || null,
            };
            addToCart(product);
        });

        navigate("/checkout");
    };

    const getFilteredOrders = () => {
        const now = new Date();

        return orders.filter((order) => {
            const orderDate = new Date(order.date);

            switch (timeFilter) {
                case "today":
                    return orderDate.toDateString() === now.toDateString();
                case "yesterday": {
                    const yesterday = new Date();
                    yesterday.setDate(now.getDate() - 1);
                    return orderDate.toDateString() === yesterday.toDateString();
                }
                case "last6days": {
                    const sixDaysAgo = new Date();
                    sixDaysAgo.setDate(now.getDate() - 6);
                    return orderDate >= sixDaysAgo;
                }
                case "last30days": {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(now.getDate() - 30);
                    return orderDate >= thirtyDaysAgo;
                }
                case "last3months": {
                    const threeMonthsAgo = new Date();
                    threeMonthsAgo.setMonth(now.getMonth() - 3);
                    return orderDate >= threeMonthsAgo;
                }
                case "last6months": {
                    const sixMonthsAgo = new Date();
                    sixMonthsAgo.setMonth(now.getMonth() - 6);
                    return orderDate >= sixMonthsAgo;
                }
                default:
                    return true;
            }
        });
    };

    const filteredOrders = getFilteredOrders().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (loading) return <p className="text-center text-white py-6">Cargando historial...</p>;
    if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

    return (
        <div className="container mx-auto p-6 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mb-6 text-center">
                Historial de Compras
            </h2>

            <div className="mb-6 flex justify-end">
                <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded-md px-3 py-2 text-sm transition-transform transform hover:scale-105 duration-300 
             hover:shadow-[0_0_20px_rgba(0,255,0,0.7)]">

                    <option value="all">Todo el historial</option>
                    <option value="today">Hoy</option>
                    <option value="last6days">Últimos 6 días</option>
                    <option value="last30days">Últimos 30 días</option>
                    <option value="last3months">Últimos 3 meses</option>
                    <option value="last6months">Últimos 6 meses</option>
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-400">No hay compras en este período.</p>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-black/80 border border-gray-700 p-4 rounded-xl shadow-md"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-400">
                                    Fecha: {new Date(order.date).toLocaleDateString()}
                                </p>
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${order.status === "completed"
                                            ? "bg-green-800 text-green-300 border border-green-500"
                                            : "bg-yellow-800 text-yellow-300 border border-yellow-500"
                                        }`}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            <ul className="space-y-2">
                                {order.products.map((item) => (
                                    <li
                                        key={item._id}
                                        className="flex items-center gap-4 border-b border-gray-700 pb-2"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-contain bg-white rounded-md"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-white text-sm font-semibold">
                                                {item.quantity} x {item.product.name}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                ${item.price.toLocaleString()} c/u
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-3 font-bold text-green-600">
                                Total: ${order.total.toLocaleString()}
                            </p>

                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => handleRepeatOrder(order.products)}
                                    className="px-4 py-1 text-sm font-semibold border border-green-500 text-green-400 hover:bg-green-900 rounded-full transition duration-200"
                                >
                                    Repetir compra
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
