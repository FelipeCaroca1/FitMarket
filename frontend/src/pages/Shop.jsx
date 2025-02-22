import useProducts from "../hooks/useProduct";

const Shop = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center text-white">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Catálogo de Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-black/90 text-white p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-400 text-sm">{product.description}</p>
            <p className="text-red-500 font-semibold mt-2">${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
