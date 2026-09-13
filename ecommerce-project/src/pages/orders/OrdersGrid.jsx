import { Fragment } from "react";
import { Link } from "react-router";

import OrderDetailsGrid from "./ordersgrid/OrderDetailsGrid";
import OrderHeader from "./ordersgrid/OrderHeader";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export default function OrdersGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className="order-container"
            data-testid="order-container"
          >
            <OrderHeader order={order} />
            <OrderDetailsGrid
              order={order}
              orderId={order.id}
              loadCart={loadCart}
            />
          </div>
        );
      })}
    </div>
  );
}
