import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import CartContext from "../context/CartContext";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize: selectedSize || availableSizes[0],
    });
    onClose(); // Cierra la modal después de agregar al carrito
  };

  if (!isOpen || !product) return null;

  const availableSizes = Array.isArray(product.tallas)
    ? product.tallas
    : typeof product.tallas === "string"
      ? product.tallas.split(", ")
      : [];

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-background text-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[85vh] flex flex-col relative"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 bg-background p-2 rounded-full hover:bg-red-500 transition-all z-50"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
          <div className="w-full lg:w-1/2 flex justify-center items-center bg-white rounded-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain" />
          </div>

          <div className="w-full lg:w-1/2 p-4 max-h-[70vh] overflow-y-auto modal-content">
            <h2 className="text-2xl font-bold text-red-500">{product.name}</h2>
            <p className="text-gray-400 mt-2">{product.description}</p>

            {product.detalles?.uso && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-500">Modo de Uso:</h3>
                <p className="text-gray-400">{product.detalles.uso}</p>
              </div>
            )}

            {product.detalles?.beneficios?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-500">Beneficios:</h3>
                <ul className="list-disc list-inside text-gray-400">
                  {product.detalles.beneficios.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.detalles?.ingredientes?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-500">Ingredientes:</h3>
                <ul className="list-disc list-inside text-gray-400">
                  {product.detalles.ingredientes.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.detalles?.tablaNutricional && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-500">Tabla Nutricional:</h3>
                <table className="w-full mt-2 border-collapse border border-gray-500">
                  <tbody>
                    {Object.entries(product.detalles.tablaNutricional).map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-500 px-4 py-2">{key}</td>
                        <td className="border border-gray-500 px-4 py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-col gap-4 mt-4">
              {availableSizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-red-500">Selecciona tu talla:</h3>
                  <select
                    value={selectedSize || availableSizes[0]}
                    onChange={handleSizeChange}
                    className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 hover:border-red-500 hover:bg-[#3a3a3a] transition"
                  >
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-red-500">Cantidad:</h3>
                <div className="flex">
                  <button
                    onClick={handleDecrease}
                    className="p-2 bg-[#2d2d2d] text-white border-gray-600 focus:outline-none border focus:border-red-500 hover:border-red-500 hover:bg-[#3a3a3a] transition"
                  >
                    -
                  </button>
                  <span className="p-2 bg-[#2d2d2d] text-white border-t border-b border-gray-600 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="p-2 bg-[#2d2d2d] text-white border-gray-600 focus:outline-none border focus:border-red-500 hover:border-red-500 hover:bg-[#3a3a3a] transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-red-500 font-bold text-xl">${product.price.toLocaleString()}</p>
          <Button size="medium" className="hover:bg-red-700" onClick={handleAddToCart}>
            Agregar {quantity} al Carrito {selectedSize && `(Talla: ${selectedSize})`}
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductDetailModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    detalles: PropTypes.shape({
      uso: PropTypes.string,
      beneficios: PropTypes.arrayOf(PropTypes.string),
      ingredientes: PropTypes.arrayOf(PropTypes.string),
      tablaNutricional: PropTypes.object,
    }),
    tallas: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    price: PropTypes.number.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailModal;
