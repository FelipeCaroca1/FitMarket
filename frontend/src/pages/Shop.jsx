import { useState } from "react";
import useProducts from "../hooks/useProduct";
import ProductDetailModal from "../components/ProductDetailModal";
import Button from "../components/Button";

const Shop = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Error al obtener detalles del producto");
      }
      const productData = await response.json();
      setSelectedProduct(productData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <p className="text-center text-white">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">
          Catálogo de Productos
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-black/90 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain rounded bg-white"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-red-500 font-semibold">${product.price.toLocaleString()}</p>
              <Button size="small" onClick={() => openModal(product._id)}>Ver Más</Button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Shop;
