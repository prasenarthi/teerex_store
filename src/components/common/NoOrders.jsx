import React from "react";
import "../../styles/components/CartItem.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const NoOrders = () => {
  return (
    <div className="no-orders-container">
      <h1>No Order Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Button className="noorders-page-button">
        <Link to="/products">Buy Now</Link>
      </Button>
    </div>
  );
};

export default NoOrders;
