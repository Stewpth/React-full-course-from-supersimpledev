import axios from "axios";

import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import Homepage from "./pages/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
