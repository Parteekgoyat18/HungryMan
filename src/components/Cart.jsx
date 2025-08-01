import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/Formating";
import Button from "./UI/Button";
import UserProgContext from "../store/UserProgContext";
import CartItems from "./CartItems";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleHideCart() {
    userProgressCtx.hideCheckOut();
  };

  function handleGoTOCheckOut() {
    userProgressCtx.showCheckOut();
  }

  return (
    <Modal
      key={userProgressCtx.progress}
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={handleHideCart}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItems
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrese={() => cartCtx.addItem(item)}
            onDecrese={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button type="button" textOnly onClick={handleHideCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 ? <Button onClick={handleGoTOCheckOut}>Go to Checkout</Button> : null}
        
      </p>
    </Modal>
  );
}
