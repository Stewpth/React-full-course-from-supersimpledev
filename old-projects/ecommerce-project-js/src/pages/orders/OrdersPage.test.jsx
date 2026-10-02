import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Orders from "./OrdersPage";

vi.mock("axios");

describe("OrdersPage component", () => {
  let cart;
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

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

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/orders?expand=products") {
        return {
          data: [
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
            {
              id: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
              orderTimeMs: 1718013600000,
              totalCostCents: 4190,
              products: [
                {
                  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                  quantity: 2,
                  estimatedDeliveryTimeMs: 1718618400000,
                  product: {
                    keywords: ["sports", "basketballs"],
                    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image:
                      "images/products/intermediate-composite-basketball.jpg",
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
              ],
              createdAt: "2026-09-06T09:19:18.391Z",
              updatedAt: "2026-09-06T09:19:18.391Z",
            },
          ],
        };
      }
    });
  });

  it("displays the shared header (ecommerce header) correctly", async () => {
    render(
      <MemoryRouter>
        <Orders cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    await screen.findAllByTestId("order-container");

    const ecommerceLogo = screen.getByTestId("shared-header-logo");
    const ecommerceMobileLogo = screen.getByTestId("shared-mobile-header-logo");

    const ecommerceHeaderCartQuantity = screen.getByTestId(
      "shared-header-cart-quantity",
    );

    expect(ecommerceLogo).toHaveAttribute(
      "src",
      "/src/assets/images/logo-white.png",
    );

    expect(ecommerceMobileLogo).toHaveAttribute(
      "src",
      "/src/assets/images/mobile-logo-white.png",
    );

    expect(ecommerceHeaderCartQuantity).toHaveTextContent("3");
  });

  it("display the orders correctly", async () => {
    render(
      <MemoryRouter>
        <Orders cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    // Get all orders first
    const orderContainers = await screen.findAllByTestId("order-container");

    // Checks if the orders are displayed exactly to the test data.
    expect(orderContainers).toHaveLength(2);

    // Checks the first order header if its correct
    const firstOrderHeader = within(orderContainers[0]).getByTestId(
      "order-header",
    );

    expect(
      within(firstOrderHeader).getByText("Order Placed:"),
    ).toBeInTheDocument();
    expect(within(firstOrderHeader).getByText("August 12")).toBeInTheDocument();
    expect(within(firstOrderHeader).getByText("$35.06")).toBeInTheDocument();
    expect(
      within(firstOrderHeader).getByText(
        "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      ),
    ).toBeInTheDocument();

    // Checks the first order products image if its correct
    const firstOrderProductImages = within(orderContainers[0]).getAllByTestId(
      "order-product-image",
    );
    expect(firstOrderProductImages).toHaveLength(2);
    expect(firstOrderProductImages[0]).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(firstOrderProductImages[1]).toHaveAttribute(
      "src",
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    );

    // Checks the first order products name if its correct
    const firstOrderProductNames = within(orderContainers[0]).getAllByTestId(
      "order-product-name",
    );
    expect(firstOrderProductNames).toHaveLength(2);

    expect(firstOrderProductNames[0]).toHaveTextContent(
      "Black and Gray Athletic Cotton Socks - 6 Pair",
    );
    expect(firstOrderProductNames[1]).toHaveTextContent(
      "Adults Plain Cotton T-Shirt - 2 Pack",
    );

    // Checks the first order products delivery date if its correct.
    const firstOrderProductDeliveryDates = within(
      orderContainers[0],
    ).getAllByTestId("order-product-delivery-date");

    expect(firstOrderProductDeliveryDates).toHaveLength(2);

    expect(firstOrderProductDeliveryDates[0]).toHaveTextContent(
      "Arriving on: September 13",
    );
    expect(firstOrderProductDeliveryDates[1]).toHaveTextContent(
      "Arriving on: September 13",
    );

    // Checks the first order product quantities if its correct.
    const firstOrderProductQuantities = within(
      orderContainers[0],
    ).getAllByTestId("order-product-quantity");

    expect(firstOrderProductQuantities).toHaveLength(2);

    expect(firstOrderProductQuantities[0]).toHaveTextContent("1");
    expect(firstOrderProductQuantities[1]).toHaveTextContent("2");

    const secondOrderHeader = within(orderContainers[1]).getByTestId(
      "order-header",
    );
    expect(
      within(secondOrderHeader).getByText("Order Placed:"),
    ).toBeInTheDocument();
    expect(within(secondOrderHeader).getByText("June 10")).toBeInTheDocument();
    expect(within(secondOrderHeader).getByText("$41.90")).toBeInTheDocument();
    expect(
      within(secondOrderHeader).getByText(
        "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
      ),
    ).toBeInTheDocument();

    // Checks the second order products image if its correct
    const secondOrderProductImages = within(orderContainers[1]).getAllByTestId(
      "order-product-image",
    );
    expect(secondOrderProductImages).toHaveLength(1);
    expect(secondOrderProductImages[0]).toHaveAttribute(
      "src",
      "images/products/intermediate-composite-basketball.jpg",
    );

    // Checks the second order products name if its correct
    const secondOrderProductNames = within(orderContainers[1]).getAllByTestId(
      "order-product-name",
    );
    expect(secondOrderProductNames).toHaveLength(1);
    expect(secondOrderProductNames[0]).toHaveTextContent(
      "Intermediate Size Basketball",
    );

    // Checks the second order products delivery date if its correct.
    const secondOrderProductDeliveryDates = within(
      orderContainers[1],
    ).getAllByTestId("order-product-delivery-date");

    expect(secondOrderProductDeliveryDates).toHaveLength(1);

    expect(secondOrderProductDeliveryDates[0]).toHaveTextContent(
      "September 13",
    );

    // Checks the second order product quantities if its correct.
    const secondOrderProductQuantities = within(
      orderContainers[1],
    ).getAllByTestId("order-product-quantity");
    expect(secondOrderProductQuantities).toHaveLength(1);
    expect(secondOrderProductQuantities[0]).toHaveTextContent("2");
  });

  it("checks if add to cart button is working correctly", async () => {
    render(
      <MemoryRouter>
        <Orders cart={cart} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId("order-container");
    expect(orderContainers).toHaveLength(2);

    const firstOrderProductButtons = within(orderContainers[0]).getAllByTestId(
      "buy-again-button",
    );
    expect(firstOrderProductButtons).toHaveLength(2);

    await user.click(firstOrderProductButtons[0]);

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled(1);

    await user.click(firstOrderProductButtons[1]);

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled(2);

    const secondOrderProductButtons = within(orderContainers[1]).getAllByTestId(
      "buy-again-button",
    );
    expect(secondOrderProductButtons).toHaveLength(1);

    await user.click(secondOrderProductButtons[0]);

    expect(axios.post).toHaveBeenNthCalledWith(3, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    });

    expect(loadCart).toHaveBeenCalled(3);
  });

  it("checks tracking button is working correctly", async () => {
    function Location() {
      const location = useLocation();

      return <div data-testid="tracking-location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <Orders cart={cart} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );

    const orderContainers = await screen.findAllByTestId("order-container");
    expect(orderContainers).toHaveLength(2);
    const firstOrderTrackingButtons = within(orderContainers[0]).getAllByTestId(
      "track-package-button",
    );
    const trackPackageURL = screen.getByTestId("tracking-location");

    expect(firstOrderTrackingButtons).toHaveLength(2);

    await user.click(firstOrderTrackingButtons[0]);

    expect(trackPackageURL).toHaveTextContent(
      "/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );

    await user.click(firstOrderTrackingButtons[1]);

    expect(trackPackageURL).toHaveTextContent(
      "/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    );

    const secondOrderTrackingButtons = within(
      orderContainers[1],
    ).getAllByTestId("track-package-button");

    expect(secondOrderTrackingButtons).toHaveLength(1);

    await user.click(secondOrderTrackingButtons[0]);

    expect(trackPackageURL).toHaveTextContent(
      "/tracking/b6b6c212-d30e-4d4a-805d-90b52ce6b37d/15b6fc6f-327a-4ec4-896f-486349e85a3d",
    );
  });
});
