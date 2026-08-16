import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

export default function Homepage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      // Its better to use axios because you can get the data from a response directly "response.data";
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };

    fetchProductsData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
