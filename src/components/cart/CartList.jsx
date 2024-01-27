import { Component } from "react";
import CartItem from "./CartItem";
import "../../styles/components/CartList.css";
import Button from "./../common/Button";
import CartContext from "../../context/CartContext";
import NoOrders from "../common/NoOrders";
import Payment from "../common/Payment";

class CartList extends Component {
  state = { isPayment: false };

  handlePayment = () => {
    this.setState({ isPayment: true });
  };

  render() {
    const { isPayment } = this.state;
    return (
      <CartContext.Consumer>
        {(value) => {
          const { cartList } = value;
          let totalPrice = 0;
          let isOutOfStock = false;
          cartList.forEach((each) => {
            totalPrice += each.price * each.selectedQuantity;

            if (each.selectedQuantity > each.quantity) {
              isOutOfStock = true;
            }
          });
          return (
            <div className="cart-list-container">
              {cartList.length > 0 ? (
                <>
                  {isPayment ? (
                    <Payment />
                  ) : (
                    <>
                      <ul className="cart-items-container">
                        {cartList.map((eachProduct) => (
                          <CartItem
                            key={eachProduct.id}
                            eachProduct={eachProduct}
                          />
                        ))}
                      </ul>
                      <hr />
                      <h1 className="total-price-details">
                        Total Price: <span>{totalPrice}.00</span>
                      </h1>
                      <Button
                        className={`place-order-button ${
                          isOutOfStock && "disable-btn"
                        }`}
                        onClick={this.handlePayment}
                        disabled={isOutOfStock}
                      >
                        Place Order
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <NoOrders />
              )}
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

export default CartList;
