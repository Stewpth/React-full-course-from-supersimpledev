import dayjs from "dayjs";

export default function DeliveryDate({ selectedDeliveryOptions }) {
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {dayjs(selectedDeliveryOptions.estimatedDeliveryTime).format(
        "dddd, MMMM D",
      )}
    </div>
  );
}
