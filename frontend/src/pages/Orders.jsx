import { useEffect, useState, useContext } from "react";
import CartContext from "../context/CartContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No se encontró token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/orders/history", {
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
      const product = item.product;
      addToCart(product, item.quantity);
    });
  };

  if (loading) return <p className="text-center text-white py-6">Cargando historial...</p>;
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-gray-400 to-gray-300 mb-6 text-center">
        Historial de Compras
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">Aún no has realizado compras.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-black/80 border border-gray-700 p-4 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-400">
                  Fecha: {new Date(order.date).toLocaleDateString()}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    order.status === "completed"
                      ? "bg-green-800 text-green-300 border border-green-500"
                      : "bg-yellow-800 text-yellow-300 border border-yellow-500"
                  }`}
                >
                  {order.status?.toUpperCase() || "SIN ESTADO"}
                </span>
              </div>

              <ul className="space-y-2">
                {order.products.map((item) => (
                  <li
                    key={item._id || Math.random()}
                    className="flex items-center gap-4 border-b border-gray-700 pb-2"
                  >
                    <img
                      src={item.product?.image || "/placeholder.png"}
                      alt={item.product?.name || "Producto"}
                      className="w-16 h-16 object-contain bg-white rounded-md"
                    />
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-semibold">
                        {item.quantity} x {item.product?.name || "Producto desconocido"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        ${item.price?.toLocaleString() || 0} c/u
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-3 font-bold text-green-400">
                Total: ${order.total?.toLocaleString() || 0}
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
