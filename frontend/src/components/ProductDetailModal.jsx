import PropTypes from "prop-types";
import Button from "./Button";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-background text-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[85vh] flex flex-col relative">

        <button
          className="absolute top-3 right-3 bg-background p-2 rounded-full hover:bg-red-500 transition-all z-50"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
          
          {/* Imagen del producto */}
          <div className="w-full lg:w-1/2 flex justify-center items-center bg-white rounded-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-auto object-contain" />
          </div>

          {/* Contenido con scroll */}
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

            {product.tallas?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-red-500">Tallas Disponibles:</h3>
                <p className="text-gray-400">{product.tallas.join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de precio y botón de agregar al carrito */}
        <div className="mt-4 flex justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-red-500 font-bold text-xl">${product.price.toLocaleString()}</p>
          <Button size="medium" className="hover:bg-red-700">Agregar al Carrito</Button>
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
    detalles: PropTypes.shape({
      uso: PropTypes.string,
      beneficios: PropTypes.arrayOf(PropTypes.string),
      ingredientes: PropTypes.arrayOf(PropTypes.string),
      tablaNutricional: PropTypes.shape({
        porcion: PropTypes.string,
        calorias: PropTypes.number,
        proteinas: PropTypes.string,
        grasas: PropTypes.string,
        carbohidratos: PropTypes.string,
        azucares: PropTypes.string,
      }),
    }),
    tallas: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default ProductDetailModal;
