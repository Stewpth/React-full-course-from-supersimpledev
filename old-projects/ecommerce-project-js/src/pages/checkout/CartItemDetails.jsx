import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

// I would not make the test for this components because this is already tested in OrderSummary
export default function CartItemDetails({ cartItem, loadCart }) {
  const [showUpdateQuantity, setShowUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
    });
    await loadCart();
    setShowUpdateQuantity(false);
  };

  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
        data-testid="product-image"
      />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {showUpdateQuantity && (
              <input
                type="text"
                className="quantity-input"
                data-testid="quantity-input"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    updateCartItem();
                  }
                  if (event.key === "Escape") {
                    setShowUpdateQuantity(false);
                  }
                }}
              />
            )}
            {!showUpdateQuantity && (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            data-testid="update-quantity-link"
            onClick={() => {
              if (!showUpdateQuantity) {
                setShowUpdateQuantity(true);
              } else {
                updateCartItem();
              }
            }}
          >
            Update
          </span>
          {showUpdateQuantity && (
            // This element is just the feature i added.
            // I think it's better to have this element for manual.
            <span
              className="update-quantity-link link-primary"
              onClick={() => {
                setShowUpdateQuantity(false);
              }}
            >
              Cancel
            </span>
          )}

          <span
            className="delete-quantity-link link-primary"
            data-testid="delete-cart-item-link"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
