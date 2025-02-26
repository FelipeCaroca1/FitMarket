import useProducts from "../hooks/useProduct";

const Shop = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center text-white">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 to-gray-300 bg-clip-text text-transparent inline-block bg-[length:100%_100%]">Catálogo de Productos</h2>
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
            <p className="text-red-500 font-semibold mt-2">${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
