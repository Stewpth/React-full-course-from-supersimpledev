import { Link } from "react-router";
import Header from "../components/Header";
import PageNotFoundImg from "../assets/images/page-not-found.avif";
import "./PageNotFound.css";

export default function PageNotFound({ cart }) {
  // In exercise 7i, i need to pass the cart to this component to avoid the
  // error of undefined cart in the Header component.
  return (
    <>
      <title>404 Page not found</title>
      <Header cart={cart} />
      <div className="page-not-found">
        <img
          src={PageNotFoundImg}
          alt="Page not found"
          className="page-not-found-img"
        />
        <h1 className="page-not-found-title">404 Page not found</h1>
        <h4 className="page-not-found-msg">
          Sorry you reach the page does not belongs in this web
        </h4>
        <Link className="back-to-homepage-link" to="/">
          Go back to homepage
        </Link>
      </div>
    </>
  );
}
