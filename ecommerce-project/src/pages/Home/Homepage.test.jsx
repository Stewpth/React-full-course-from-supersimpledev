import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Homepage from "./Homepage";

vi.mock("axios");

describe("Homepage component", () => {
  let user;
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();
    user = userEvent.setup();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
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
            {
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
          ],
        };
      }
    });
  });

  it("displays the product correctly", async () => {
    render(
      <MemoryRouter>
        <Homepage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      ),
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });

  it("adds the product to the cart correctly", async () => {
    render(
      <MemoryRouter>
        <Homepage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );

    const productContainers = await screen.findAllByTestId("product-container");

    // by this function, we can test more products without doing code duplications.
    // i created this function because its so hard to read when testing multiple products
    // and it creates more variables.

    // this function is not included in the activity 9h(lesson 9h). it's just a helper function.
    async function handleAddToCart(productIndex, quantityString) {
      const productContainer = productContainers[productIndex];

      const quantityContainer = within(productContainer).getByTestId(
        "product-quantity-selector",
      );

      await user.selectOptions(quantityContainer, quantityString);

      const productButton =
        within(productContainer).getByTestId("add-to-cart-button");

      await user.click(productButton);
    }

    await handleAddToCart(0, "2");
    await handleAddToCart(1, "3");

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
    });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
