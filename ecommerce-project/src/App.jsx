import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Homepage</div>} />
        <Route path="checkout" element={<div>Checkout</div>} />
        <Route path="tracking" element={<div>Tracking</div>} />
      </Routes>
    </>
  );
}

export default App;
