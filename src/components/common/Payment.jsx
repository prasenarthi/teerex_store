import "../../styles/components/CartItem.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="payment-container">
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Button className="payment-page-button">
        <Link to="/products">Shop Again</Link>
      </Button>
    </div>
  );
};

export default Payment;
