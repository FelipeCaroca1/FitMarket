import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { useCart } from "../hooks/useCart"; 

const EditOrderModal = ({ order, closeModal }) => {
  const { addToCart, removeFromCart } = useCart();
  const [editedItems, setEditedItems] = useState(
    order.products.map((item) => ({
      ...item,
      quantity: item.quantity, 
      selectedSize: item.product.tallas ? item.product.tallas[0] : null, 
    }))
  );

  const handleQuantityChange = (index, newQuantity) => {
    setEditedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = Math.max(1, newQuantity);
      return newItems;
    });
  };

  const handleSizeChange = (index, newSize) => {
    setEditedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].selectedSize = newSize;
      return newItems;
    });
  };

  const handleRemoveItem = (index) => {
    const itemToRemove = editedItems[index];
    removeFromCart(itemToRemove._id, itemToRemove.selectedSize); 
    setEditedItems((prevItems) => prevItems.filter((_, i) => i !== index)); 
  };

  const handleConfirm = () => {
    editedItems.forEach((item) => addToCart(item.product, item.quantity, item.selectedSize)); 
    closeModal(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Editar productos antes de repetir la compra</h2>
        <ul className="space-y-4">
          {editedItems.map((item, index) => (
            <li key={item._id} className="flex items-center justify-between space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-500">${item.product.price}</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-16 p-2 border rounded"
                    min="1"
                  />
                  {item.product.tallas && (
                    <select
                      value={item.selectedSize}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="p-2 border rounded"
                    >
                      {item.product.tallas.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  )}
                  <Button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between">
          <Button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Confirmar y Añadir al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

EditOrderModal.propTypes = {
  order: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditOrderModal;
