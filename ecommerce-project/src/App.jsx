import { Routes, Route } from "react-router";

import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="tracking" element={<div>Tracking</div>} />
      </Routes>
    </>
  );
}

export default App;
