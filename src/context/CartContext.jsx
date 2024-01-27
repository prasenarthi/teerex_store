import React from "react";

const CartContext = React.createContext({
  cartList: [],
  addToCart: () => {},
  deleteCartItem: () => {},
  onDecreaseItem: () => {},
  onIncreaseItem: () => {},
  clearCart: () => {},
});

export default CartContext;
