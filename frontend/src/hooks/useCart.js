import { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext.jsx";

const useCart = () => {
  const context = useContext(CartContext);
  const [state, setState] = useState(context);

  useEffect(() => {
    setState({ ...context }); // 🔥 Esto forzará la actualización del estado en ProductDetailModal
  }, [context]);

  return state;
};

export default useCart;
