import axios from "axios";

import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Homepage from "./pages/Home/Homepage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Homepage cart={cart} loadCart={loadCart} />}
        />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<PageNotFound cart={cart} />}></Route>
      </Routes>
    </>
  );
}

export default App;
