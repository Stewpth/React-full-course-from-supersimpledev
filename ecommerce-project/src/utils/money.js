export function formatMoney(amountCents) {
  if (amountCents < 0) {
    // In this activity(lesson 9b). we need to put the negative sign in front of the currency sign.
    // to do that, we need to change the value from negative to positive without changing the number.
    // so i use Math.abs for easy way but there are some ways to do that.

    // here's some example: -2 * -1 = 2
    // this is a simple math rules/arithmetic.
    // same sign will be positive and different sign will be negative.
    return `-$${Math.abs(amountCents / 100).toFixed(2)}`;
  }

  return `$${(amountCents / 100).toFixed(2)}`;
}
