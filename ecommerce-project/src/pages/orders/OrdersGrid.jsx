import { Fragment } from "react";
import { Link } from "react-router";

import OrderDetailsGrid from "./ordersgrid/OrderDetailsGrid";
import OrderHeader from "./ordersgrid/OrderHeader";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";

export default function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        console.log(order.id);

        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />
            <OrderDetailsGrid order={order} orderId={order.id} />
          </div>
        );
      })}
    </div>
  );
}
