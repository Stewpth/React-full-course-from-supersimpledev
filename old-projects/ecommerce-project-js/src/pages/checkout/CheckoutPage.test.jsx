import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import CheckoutPage from "./CheckoutPage";

vi.mock("axios");

describe("CheckoutPage component", () => {
  let loadCart;
  let cart;
  let deliveryOptions;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    cart = [
      {
        id: 1,
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
        createdAt: "2026-09-06T09:19:18.390Z",
        updatedAt: "2026-09-06T10:37:30.893Z",
        product: {
          keywords: ["socks", "sports", "apparel"],
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: {
            stars: 4.5,
            count: 87,
          },
          priceCents: 1090,
          createdAt: "2026-09-06T09:19:18.390Z",
          updatedAt: "2026-09-06T09:19:18.390Z",
        },
      },
      {
        id: 2,
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        createdAt: "2026-09-06T09:19:18.391Z",
        updatedAt: "2026-09-06T09:19:18.391Z",
        product: {
          keywords: ["sports", "basketballs"],
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127,
          },
          priceCents: 2095,
          createdAt: "2026-09-06T09:19:18.391Z",
          updatedAt: "2026-09-06T09:19:18.391Z",
        },
      },
    ];

    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-09-06T09:19:18.390Z",
        updatedAt: "2026-09-06T09:19:18.390Z",
        estimatedDeliveryTimeMs: 1789891046835,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-09-06T09:19:18.391Z",
        updatedAt: "2026-09-06T09:19:18.391Z",
        estimatedDeliveryTimeMs: 1789545446835,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-09-06T09:19:18.392Z",
        updatedAt: "2026-09-06T09:19:18.392Z",
        estimatedDeliveryTimeMs: 1789372646835,
      },
    ];

    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/delivery-options?expand=estimatedDeliveryTime") {
        return { data: deliveryOptions };
      }

      if (urlPath === "/api/payment-summary") {
        return { data: paymentSummary };
      }
    });
  });

  // Checkout header is completely tested in CheckoutHeader.test.jsx
  // DeliveryDate and DeliveryOptions are completely tested in OrderSummary.test.jsx
  // PaymentSummary is completely tested in PaymentSummary.test.jsx

  // The only we need to test is to checks if the page is rendered correctly.
  it("displays the page correctly", async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    // this testing is confusing because some people who see this code will think
    // that the delivery options must be called first so the algorithn will be okay at the flow.
    // but payment summary is first to called but it is independent so its okay.
    expect(axios.get).toHaveBeenCalledWith("/api/payment-summary");
    expect(axios.get).toHaveBeenCalledWith(
      "/api/delivery-options?expand=estimatedDeliveryTime",
    );

    expect(screen.getByText("3 items")).toBeInTheDocument();
    expect(screen.getByText("Review your order")).toBeInTheDocument();

    // This is completely tested in OrderSummary.test.jsx
    expect(
      await screen.findByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();

    // This is completely tested in PaymentSummary.test.jsx
    expect(screen.getByText("Payment Summary")).toBeInTheDocument();
    expect(screen.getByTestId("payment-total-items")).toHaveTextContent(
      "Items (3):",
    );
    expect(screen.getByTestId("payment-total-items")).toHaveTextContent(
      "$42.75",
    );
    expect(screen.getByTestId("payment-shipping-cost")).toHaveTextContent(
      "Shipping & handling:",
    );
    expect(screen.getByTestId("payment-shipping-cost")).toHaveTextContent(
      "$4.99",
    );
  });
});
