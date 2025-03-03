import { useState } from "react";
import PropTypes from "prop-types";

const categories = ["Todos", "Suplementos", "Equipamiento", "Accesorios", "Ropa", "Alimentos", "Salud"];

const ProductFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (onFilterChange) {
      onFilterChange(category);
    }
  };

  return (
    <div className="flex justify-end mb-4">
      <label htmlFor="categoryFilter" className="sr-only">
        Filtrar por categoría:
      </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border border-transparent rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500 hover:ring-2 hover:ring-red-500 hover:border-red-500 hover:bg-gray-700 transition"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

ProductFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default ProductFilter;