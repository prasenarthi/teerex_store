import Button from "./../common/Button";
import "../../styles/components/ProductList.css";
import CartContext from "../../context/CartContext";

const ProductList = (props) => {
  const { product } = props;
  const { id, name, imageURL, price, quantity } = product;
  return (
    <CartContext.Consumer>
      {(value) => {
        const { cartList, addToCart, onDecreaseItem, onIncreaseItem } = value;

        const handleAddToCart = () => {
          addToCart(product);
        };

        const handleDecreaseItem = () => {
          onDecreaseItem(id);
        };

        const handleIncreaseItem = () => {
          onIncreaseItem(id);
        };

        const isItemExist = cartList.find((each) => each.id === id);
        const isOutOfStock =
          isItemExist && isItemExist.selectedQuantity > quantity;
        return (
          <li key={id} className="product-item">
            <img src={imageURL} alt={name} className="product-image" />
            <div>
              <p className="product-name">{name}</p>
              <p className="product-price">Rs {price}.00</p>
            </div>
            <div>
              {isItemExist ? (
                <div className="product-value-stock">
                  <div className="product-add-value">
                    <p
                      onClick={handleDecreaseItem}
                      className="minus-square-fill"
                    >
                      -
                    </p>
                    <p>{isItemExist.selectedQuantity}</p>
                    <p
                      onClick={handleIncreaseItem}
                      className="plus-square-fill"
                    >
                      +
                    </p>
                  </div>
                  {isOutOfStock && <p className="out-of-stock">Out of Stock</p>}
                </div>
              ) : (
                <Button
                  className="product-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </li>
        );
      }}
    </CartContext.Consumer>
  );
};

export default ProductList;
