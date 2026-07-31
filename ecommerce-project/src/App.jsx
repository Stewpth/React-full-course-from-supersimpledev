import { Routes, Route } from "react-router";

import Homepage from "./pages/Homepage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="tracking" element={<div>Tracking</div>} />
      </Routes>
    </>
  );
}

export default App;
