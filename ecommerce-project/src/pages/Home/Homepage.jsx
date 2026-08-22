import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import "./HomePage.css";

export default function Homepage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProductsData = async () => {
      // Its better to use axios because you can get the data from a response directly "response.data";
      if (search) {
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data);
      } else {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      }
    };

    fetchProductsData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
