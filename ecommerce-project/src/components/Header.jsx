import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { quantityCounter } from "../utils/count";

import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import "./Header.css";

export default function Header({ cart }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink
            to="/"
            className="header-link"
            onClick={() => {
              // Reset the input after clicking the home button
              setSearchText("");
            }}
          >
            <img className="logo" src={LogoWhite} />
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(`/?search=${searchText}`);
              }
            }}
          />

          <button
            className="search-button"
            onClick={() => {
              // console.log(searchText);
              navigate(`/?search=${searchText}`);
            }}
          >
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{quantityCounter(cart)}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
