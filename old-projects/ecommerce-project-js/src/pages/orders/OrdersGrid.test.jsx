import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";

vi.mock("axios");

describe("OrdersGrid component", () => {
  let loadCart;
  let orders;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();
    orders = [
      {
        id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
        orderTimeMs: 1723456800000,
        totalCostCents: 3506,
        products: [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            estimatedDeliveryTimeMs: 1723716000000,
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
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 2,
            estimatedDeliveryTimeMs: 1723456800000,
            product: {
              keywords: ["tshirts", "apparel", "mens"],
              id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
              image:
                "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
              name: "Adults Plain Cotton T-Shirt - 2 Pack",
              rating: {
                stars: 4.5,
                count: 56,
              },
              priceCents: 799,
              createdAt: "2026-09-06T09:19:18.392Z",
              updatedAt: "2026-09-06T09:19:18.392Z",
            },
          },
        ],
        createdAt: "2026-09-06T09:19:18.390Z",
        updatedAt: "2026-09-06T09:19:18.390Z",
      },
    ];
  });

  beforeEach(() => {
    loadCart = vi.fn();
  });

  it("display the ordered products correctly", () => {
    render(
      <MemoryRouter>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainer = screen.getByTestId("order-container");

    // Checks the header of the order
    expect(orderContainer).toHaveTextContent("Order Placed:");
    expect(orderContainer).toHaveTextContent("August 12");
    expect(orderContainer).toHaveTextContent("Total:");
    expect(orderContainer).toHaveTextContent("$35.06");
    expect(orderContainer).toHaveTextContent("Order ID:");
    expect(orderContainer).toHaveTextContent(
      "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
    );

    // Display the product images correctly
    const orderProductsImages = within(orderContainer).getAllByTestId(
      "order-product-image",
    );
    expect(orderProductsImages).toHaveLength(2);
    expect(orderProductsImages[0]).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(orderProductsImages[1]).toHaveAttribute(
      "src",
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    );

    // Display the product names correctly
    const orderProductsName =
      within(orderContainer).getAllByTestId("order-product-name");
    expect(orderProductsName).toHaveLength(2);
    expect(orderProductsName[0]).toHaveTextContent(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    );
    expect(orderProductsName[1]).toHaveTextContent(
      "Adults Plain Cotton T-Shirt - 2 Pack",
    );

    const orderProductDeliveryDate = within(orderContainer).getAllByTestId(
      "order-product-delivery-date",
    );
    expect(orderProductDeliveryDate).toHaveLength(2);
    expect(orderProductDeliveryDate[0]).toHaveTextContent("September 13");
    expect(orderProductDeliveryDate[1]).toHaveTextContent("September 13");

    // Display the product quantities correctly
    const orderProductQuantity = within(orderContainer).getAllByTestId(
      "order-product-quantity",
    );
    expect(orderProductQuantity).toHaveLength(2);
    expect(orderProductQuantity[0]).toHaveTextContent("1");
    expect(orderProductQuantity[1]).toHaveTextContent("2");
  });

  it("add the product to the cart when clicks the buy again button", async () => {
    render(
      <MemoryRouter>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainer = screen.getByTestId("order-container");

    const addToCartButtons =
      within(orderContainer).getAllByTestId("buy-again-button");
    expect(addToCartButtons).toHaveLength(2);

    await user.click(addToCartButtons[0]);

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled(1);

    await user.click(addToCartButtons[1]);

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled(2);
  });

  it("go to the tracking page when clicks the track package button", async () => {
    function Location() {
      const location = useLocation();

      return <div data-testid="tracking-location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <OrdersGrid orders={orders} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );

    const orderContainer = screen.getByTestId("order-container");
    const trackPackageButtons = within(orderContainer).getAllByTestId(
      "track-package-button",
    );
    expect(trackPackageButtons).toHaveLength(2);
    const trackPackageURL = screen.getByTestId("tracking-location");

    await user.click(trackPackageButtons[0]);

    expect(trackPackageURL).toHaveTextContent(
      "/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );

    await user.click(trackPackageButtons[1]);
    expect(trackPackageURL).toHaveTextContent(
      "/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    );
  });
});
