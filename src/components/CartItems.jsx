import { currencyFormatter } from "../util/Formating";

export default function CartItems({
  name,
  quantity,
  price,
  onIncrese,
  onDecrese,
}) {
  return (
    <li className="cart-item">
      <p>
        {quantity > 1
          ? `${name} - ${quantity} x ${currencyFormatter.format(price)}`
          : `${name} - ${currencyFormatter.format(price)}`}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrese}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrese}>+</button>
      </p>
    </li>
  );
}
