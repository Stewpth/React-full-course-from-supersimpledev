import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Header from "../components/Header";
import "./TrackingPage.css";

export default function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  // Every orderId change, the useEffect will triggered to make
  // the track package interactive.
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    fetchOrders();
  }, [orderId]);

  if (!order) {
    return;
  }

  const trackedProduct = order.products.find((product) => {
    return product.productId === productId;
  });
  const totalDeliveryTimeMs =
    trackedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryProgress = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryProgress > 100) {
    deliveryProgress = 100;
  }

  console.log(trackedProduct);
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {`${
              deliveryProgress >= 100
                ? `Delivered on ${dayjs(
                    trackedProduct.estimatedDeliveryTimeMs,
                  ).format("dddd, MMMM D")}`
                : `Arriving on ${dayjs(
                    trackedProduct.estimatedDeliveryTimeMs,
                  ).format("dddd, MMMM D")}`
            }`}
          </div>

          <div className="product-info">{trackedProduct.product.name}</div>

          <div className="product-info">
            Quantity: {trackedProduct.quantity}
          </div>

          <img className="product-image" src={trackedProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
