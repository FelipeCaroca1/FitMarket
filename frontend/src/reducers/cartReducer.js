export const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { _id, selectedSize, quantity, stock } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === _id && item.selectedSize === selectedSize
      );

      let updatedCart;

      if (existingItemIndex !== -1) {
        const updatedItem = { ...state.cartItems[existingItemIndex] };
        updatedItem.quantity = Math.min(updatedItem.quantity + quantity, stock); // 🔹 No supera el stock
        updatedCart = [...state.cartItems];
        updatedCart[existingItemIndex] = updatedItem;
      } else {
        updatedCart = [...state.cartItems, action.payload];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "UPDATE_CART": {
      const { _id, selectedSize, quantity } = action.payload;
      const updatedCart = state.cartItems.map((item) =>
        item._id === _id && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cartItems.filter(
        (item) => !(item._id === action.payload._id && item.selectedSize === action.payload.selectedSize)
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cartItems: updatedCart };
    }

    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return { ...state, cartItems: [] };
    }

    default:
      return state;
  }
};
