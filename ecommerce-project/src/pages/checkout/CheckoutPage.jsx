import axios from "axios";
import { useState, useEffect } from "react";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import "./CheckoutPage.css";

export default function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);

      // response = await axios.get("/api/payment-summary");
      // setPaymentSummary(response.data);
    };

    fetchCheckoutData();
  }, [cart]);

  // axios can be used in the browser console to test the API endpoints
  // to access axios in the browser console, just add the code below.

  // in lesson 8c, simon wants us to test the axios from the console
  // then call this api: axios.post("/api/reset").

  // axios.post("/api/reset") will back the database to default values.
  // window.axios = axios;

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary
            paymentSummary={paymentSummary}
            setPaymentSummary={setPaymentSummary}
            loadCart={loadCart}
            cart={cart}
          />
        </div>
      </div>
    </>
  );
}
