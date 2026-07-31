import { Routes, Route } from "react-router";

import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="checkout" element={<div>Checkout</div>} />
        <Route path="tracking" element={<div>Tracking</div>} />
      </Routes>
    </>
  );
}

export default App;
