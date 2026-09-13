import { it, expect, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import PageNotFound from "./PageNotFound";

describe("PageNotFound page", () => {
  let user;

  let cart;

  beforeEach(() => {
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
  });

  it("display the page not found message", () => {
    render(
      <MemoryRouter>
        <PageNotFound cart={cart} />
      </MemoryRouter>,
    );

    expect(screen.getByText("404 Page not found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry you reach the page does not belongs in this web"),
    ).toBeInTheDocument();
    expect(screen.getByText("Go back to homepage")).toBeInTheDocument();
  });

  it("go back to homepage when click on go back to homepage button", async () => {
    function Location() {
      const location = useLocation();

      return <div data-testid="location">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PageNotFound cart={cart} />
        <Location />
      </MemoryRouter>,
    );

    const backToHomePageBtn = screen.getByTestId("go-back-to-homepage-link");
    expect(backToHomePageBtn).toHaveAttribute("href", "/");

    await user.click(backToHomePageBtn);

    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});
