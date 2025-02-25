export const initialState = {
    cartItems: [],
  };
  
  export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART": {
        const existingItem = state.cartItems.find(item => item._id === action.payload._id);
  
        if (existingItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          };
        }
      }
  
      case "REMOVE_FROM_CART": {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item._id !== action.payload),
        };
      }
  
      case "CLEAR_CART": {
        return {
          ...state,
          cartItems: [],
        };
      }
  
      default:
        return state;
    }
  };
  