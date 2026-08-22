import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import Product from "./Product";

export default function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} loadCart={loadCart} product={product} />
        );
      })}
    </div>
  );
}
