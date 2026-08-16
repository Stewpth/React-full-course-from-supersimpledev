// I created this function to reduce the code duplication
// this function used in checkout's header and shared header.
export function quantityCounter(items) {
  let totalQuantity = 0;

  items.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
}
