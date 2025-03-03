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
        className="p-2 rounded bg-[#2d2d2d] text-white focus:outline-none border border-gray-600 focus:border-red-500 hover:border-red-500 hover:bg-[#3a3a3a] transition"
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