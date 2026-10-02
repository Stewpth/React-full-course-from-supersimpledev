import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderHeader from "./OrderHeader";

describe("OrderHeader component", () => {
  it("display the order's information correctly", () => {
    const order = {
      id: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      orderTimeMs: 1723456800000,
      totalCostCents: 3506,
    };

    render(<OrderHeader order={order} />);

    expect(screen.getByText("Order Placed:")).toBeInTheDocument();
    expect(screen.getByText("August 12")).toBeInTheDocument();
    expect(screen.getByText("$35.06")).toBeInTheDocument();
    expect(screen.getByText("Order ID:")).toBeInTheDocument();
    expect(
      screen.getByText("27cba69d-4c3d-4098-b42d-ac7fa62b7664"),
    ).toBeInTheDocument();
  });
});
