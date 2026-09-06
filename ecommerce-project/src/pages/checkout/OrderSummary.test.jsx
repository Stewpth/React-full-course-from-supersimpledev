import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import OrderSummary from "./OrderSummary";

vi.mock("axios");

describe("OrderSummary component", () => {
  let loadCart;
  let user;
  let cart;
  let deliveryOptions;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
      },
    ];

    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
        product: {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: {
            stars: 4.5,
            count: 87,
          },
          priceCents: 1090,
          keywords: ["socks", "sports", "apparel"],
        },
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
        product: {
          id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          image: "images/products/intermediate-composite-basketball.jpg",
          name: "Intermediate Size Basketball",
          rating: {
            stars: 4,
            count: 127,
          },
          priceCents: 2095,
          keywords: ["sports", "basketballs"],
        },
      },
    ];
  });

  it("displays the products in the cart", () => {
    render(
      <MemoryRouter>
        <OrderSummary
          loadCart={loadCart}
          cart={cart}
          deliveryOptions={deliveryOptions}
        />
      </MemoryRouter>,
    );

    const cartItemContainers = screen.getAllByTestId("cart-item-container");

    expect(cartItemContainers).toHaveLength(2);

    expect(
      within(cartItemContainers[0]).getByTestId("product-image"),
    ).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(
      within(cartItemContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[0]).getByText("$10.90"),
    ).toBeInTheDocument();
    expect(within(cartItemContainers[0]).getByText("2")).toBeInTheDocument();

    expect(
      within(cartItemContainers[0]).getByTestId("product-image"),
    ).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
    expect(
      within(cartItemContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
    expect(
      within(cartItemContainers[1]).getByText("$20.95"),
    ).toBeInTheDocument();
    expect(within(cartItemContainers[1]).getByText("1")).toBeInTheDocument();
  });

  it("delete the specific product in the cart", async () => {
    render(
      <MemoryRouter>
        <OrderSummary
          loadCart={loadCart}
          cart={cart}
          deliveryOptions={deliveryOptions}
        />
      </MemoryRouter>,
    );
    const cartItemContainers = screen.getAllByTestId("cart-item-container");
    expect(cartItemContainers).toHaveLength(2);

    const firstDeleteCartItem = within(cartItemContainers[0]).getByTestId(
      "delete-cart-item-link",
    );
    await user.click(firstDeleteCartItem);
    expect(axios.delete).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    );
    expect(loadCart).toHaveBeenCalledTimes(1);

    const secondDeleteCartItem = within(cartItemContainers[1]).getByTestId(
      "delete-cart-item-link",
    );
    await user.click(secondDeleteCartItem);
    expect(axios.delete).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d",
    );
    expect(loadCart).toHaveBeenCalledTimes(2);
  });

  it("change the quantity of the products in the cart", async () => {
    render(
      <MemoryRouter>
        <OrderSummary
          loadCart={loadCart}
          cart={cart}
          deliveryOptions={deliveryOptions}
        />
      </MemoryRouter>,
    );

    const cartItemContainers = screen.getAllByTestId("cart-item-container");
    expect(cartItemContainers).toHaveLength(2);

    const firstQuantityButton = within(cartItemContainers[0]).getByTestId(
      "update-quantity-link",
    );

    await user.click(firstQuantityButton);

    const firstQuantityInput = await within(cartItemContainers[0]).findByTestId(
      "quantity-input",
    );

    await user.clear(firstQuantityInput);
    await user.type(firstQuantityInput, "3");

    await user.click(firstQuantityButton);

    expect(axios.put).toHaveBeenNthCalledWith(
      1,
      "/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      {
        quantity: 3,
      },
    );

    expect(loadCart).toHaveBeenCalledTimes(1);

    const secondQuantityButton = within(cartItemContainers[1]).getByTestId(
      "update-quantity-link",
    );

    await user.click(secondQuantityButton);

    const secondQuantityInput = await within(
      cartItemContainers[1],
    ).findByTestId("quantity-input");

    await user.clear(secondQuantityInput);
    await user.type(secondQuantityInput, "5");

    await user.click(secondQuantityButton);

    expect(axios.put).toHaveBeenNthCalledWith(
      2,
      "/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d",
      {
        quantity: 5,
      },
    );

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
