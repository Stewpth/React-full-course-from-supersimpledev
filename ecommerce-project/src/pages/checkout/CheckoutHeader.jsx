import { Link } from "react-router";
import { quantityCounter } from "../../utils/count";

import Logo from "../../assets/images/logo.png";
import MobileLogo from "../../assets/images/mobile-logo.png";
import CheckoutLockLogo from "../../assets/images/icons/checkout-lock-icon.png";

import "./CheckoutHeader.css";

// I already change the <a> element into link so i leave the comment instead.
// This is for Lesson 6 exercise/activity 6c.
export default function CheckoutHeader({ cart }) {
  return (
    <div className="checkout-header" data-testid="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img
              className="logo"
              src={Logo}
              data-testid="checkout-ecommerce-logo"
            />
            <img
              className="mobile-logo"
              src={MobileLogo}
              data-testid="checkout-ecommerce-logo-mobile"
            />
          </Link>
        </div>

        <div
          className="checkout-header-middle-section"
          data-testid="checkout-header-middle-section"
        >
          Checkout (
          <Link className="return-to-home-link" to="/">
            {quantityCounter(cart)} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img
            src={CheckoutLockLogo}
            data-testid="checkout-header-right-section-img"
          />
        </div>
      </div>
    </div>
  );
}
