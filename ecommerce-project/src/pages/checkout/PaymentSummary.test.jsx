import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import { useState } from "react";
import PaymentSummary from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary Component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/payment-summary") {
        return {
          data: {
            totalItems: 10,
            productCostCents: 11323,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 11822,
            taxCents: 1182,
            totalCostCents: 13004,
          },
        };
      }
    });
  });

  it("display the payment summary correctly", async () => {
    // Payment summary component needs state prop.
    // To do that, we need to wrap the component with a state.
    // and add the state to the component(paymentSummary and setPaymentSummary).
    function TestComponent() {
      const [paymentSummary, setPaymentSummary] = useState(null);

      return (
        <>
          <PaymentSummary
            paymentSummary={paymentSummary}
            setPaymentSummary={setPaymentSummary}
            loadCart={loadCart}
            cart={[]}
          />
        </>
      );
    }

    // this function removes repetition and makes the code more readable.
    // i just did this because its so hard to read the code when we have a lot of expect.
    async function testRow(rowTestId, outputName, outputValue) {
      const row = await screen.findByTestId(rowTestId);

      expect(row).toHaveTextContent(outputName);
      expect(row).toHaveTextContent(outputValue);
    }

    render(
      <MemoryRouter>
        <TestComponent />
      </MemoryRouter>,
    );

    await testRow("payment-total-items", "Items (10):", "$113.23");
    await testRow("payment-shipping-cost", "Shipping & handling:", "$4.99");
    await testRow("payment-total-before-tax", "Total before tax:", "$118.22");
    await testRow("payment-estimated-tax", "Estimated tax (10%):", "$11.82");
    await testRow("payment-total-cost", "Order total:", "$130.04");
  });
});
