import { Routes, Route } from "react-router";

import Homepage from "./pages/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
