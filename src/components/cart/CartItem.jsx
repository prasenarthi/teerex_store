import "../../styles/components/CartItem.css";
import CartContext from "./../../context/CartContext";

const CartItem = (props) => {
  const { eachProduct } = props;
  const { id, name, imageURL } = eachProduct;
  return (
    <CartContext.Consumer>
      {(value) => {
        const { deleteCartItem, onIncreaseItem, onDecreaseItem } = value;

        const handleDecrease = () => {
          onDecreaseItem(id);
        };

        const handleDelete = () => {
          deleteCartItem(id);
        };

        const handleIncrease = () => {
          onIncreaseItem(id);
        };
        const productPrice = eachProduct.price * eachProduct.selectedQuantity;
        const itemStockAlert =
          eachProduct.selectedQuantity > eachProduct.quantity;
        return (
          <li key={id} className="cart-item">
            <div className="img-name-container">
              <img src={imageURL} alt={name} className="cart-product-img" />
              <p className="cart-product-title">{name}</p>
            </div>
            <div className="cart-stock-count">
              <div className="cart-value">
                <p onClick={handleDecrease} className="cart-minus-icon">
                  -
                </p>
                <p>{eachProduct.selectedQuantity}</p>
                <p onClick={handleIncrease} className="cart-plus-icon">
                  +
                </p>
              </div>
              {itemStockAlert && <p className="out-of-stock">Out of Stock</p>}
            </div>
            <div className="cart-delete-and-price">
              <p>{productPrice}.00</p>
              <p onClick={handleDelete}>Delete</p>
            </div>
          </li>
        );
      }}
    </CartContext.Consumer>
  );
};

export default CartItem;
