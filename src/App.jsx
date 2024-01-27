import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Header from "./components/common/Header";
import CartContext from "./context/CartContext";

//getting data from localstorage
const getCartData = () => {
  const localCartData = JSON.parse(localStorage.getItem("cart_details"));
  if (localCartData === null) {
    return [];
  }
  return localCartData;
};

class App extends Component {
  state = { cartList: getCartData() };

  //setting localStorage for persistance of data in cart
  setCartData = () => {
    const { cartList } = this.state;
    localStorage.setItem("cart_details", JSON.stringify(cartList));
  };

  //add product to cart
  addToCart = (product) => {
    const { cartList } = this.state;
    const isItemExist = cartList.find((each) => each.id === product.id);
    if (isItemExist) {
      const updatedCartData = cartList.map((each) => {
        if (each.id === isItemExist.id) {
          return { ...each, selectedQuantity: each.selectedQuantity + 1 };
        }
        return each;
      });
      this.setState({ cartList: updatedCartData }, this.setCartData);
    } else {
      this.setState(
        (prevState) => ({
          cartList: [
            ...prevState.cartList,
            { ...product, selectedQuantity: 1 },
          ],
        }),
        this.setCartData
      );
    }
  };

  //add 2 or more products
  onIncreaseItem = (id) => {
    const { cartList } = this.state;
    const UpdatedCart = cartList.map((each) => {
      if (each.id === id) {
        return { ...each, selectedQuantity: each.selectedQuantity + 1 };
      }
      return each;
    });
    this.setState({ cartList: UpdatedCart }, this.setCartData);
  };

  //decrease number of quantity
  onDecreaseItem = (id) => {
    const { cartList } = this.state;
    const itemQuantity = cartList.find((each) => each.id === id);
    if (itemQuantity.selectedQuantity > 1) {
      const updatedData = cartList.map((each) => {
        if (each.id === id) {
          return { ...each, selectedQuantity: each.selectedQuantity - 1 };
        }
        return each;
      });
      this.setState({ cartList: updatedData }, this.setCartData);
    } else {
      this.deleteCartItem(id);
    }
  };

  //delete product
  deleteCartItem = (id) => {
    const { cartList } = this.state;
    const deleteCartItem = cartList.filter((each) => each.id !== id);
    this.setState({ cartList: deleteCartItem }, this.setCartData);
  };

  //remove all products from cart
  clearCart = () => {
    this.setState({ cartList: [] }, this.setCartData);
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addToCart: this.addToCart,
          onDecreaseItem: this.onDecreaseItem,
          onIncreaseItem: this.onIncreaseItem,
          clearCart: this.clearCart,
          deleteCartItem: this.deleteCartItem,
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    );
  }
}

export default App;
