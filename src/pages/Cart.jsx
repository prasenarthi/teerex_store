import { Component } from "react";
import "../styles/pages/Cart.css";
import CartList from "../components/cart/CartList";

class Cart extends Component {
  render() {
    return (
      <div className="cart-container">
        <h1>My Cart</h1>
        <CartList />
      </div>
    );
  }
}

export default Cart;
