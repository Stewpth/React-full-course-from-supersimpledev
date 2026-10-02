import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CheckoutHeader from "./CheckoutHeader";

describe("CheckoutHeader components", () => {
  const cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];

  it("display the checkout headers correctly", () => {
    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
      </MemoryRouter>,
    );

    const checkoutLogo = screen.getByTestId("checkout-ecommerce-logo");
    const checkoutLogoMobile = screen.getByTestId(
      "checkout-ecommerce-logo-mobile",
    );

    expect(checkoutLogo).toHaveAttribute("src", "/src/assets/images/logo.png");
    expect(checkoutLogoMobile).toHaveAttribute(
      "src",
      "/src/assets/images/mobile-logo.png",
    );

    const checkoutCartQuantity = screen.getByTestId(
      "checkout-header-middle-section",
    );

    expect(checkoutCartQuantity).toHaveTextContent("Checkout (3 items)");

    const checkoutRightSectionImg = screen.getByTestId(
      "checkout-header-right-section-img",
    );
    expect(checkoutRightSectionImg).toHaveAttribute(
      "src",
      "/src/assets/images/icons/checkout-lock-icon.png",
    );
  });
});
