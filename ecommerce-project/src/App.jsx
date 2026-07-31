import { Routes, Route } from "react-router";

import Homepage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<div>Tracking</div>} />
      </Routes>
    </>
  );
}

export default App;
