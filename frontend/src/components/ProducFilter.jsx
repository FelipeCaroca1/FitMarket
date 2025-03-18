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
    <div className="mb-6 flex justify-end">
      <label htmlFor="categoryFilter" className="sr-only">
        Filtrar por categoría:
      </label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="bg-black text-white border border-gray-600 rounded-md px-3 py-2 text-sm transition-transform transform hover:scale-105 duration-300 hover:shadow-[0_0_20px_rgba(0,255,0,0.7)]"
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
