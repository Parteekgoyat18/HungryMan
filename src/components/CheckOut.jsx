import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/Formating";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgContext from "../store/UserProgContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function closeHandle(hand) {
    hand.preventDefault();
    userProgressCtx.hideCheckOut();
  }

  function handleFinish() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart();
    clearData();
  }

  function handelSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const coustmerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: coustmerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly onClick={closeHandle}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <p>Sending Order...</p>;
  }

  if(data && !error) {
    return (
      <Modal key={userProgressCtx.progress} open={userProgressCtx.progress === "checkout"} onClick={handleFinish}>
        <h2>Success!</h2>
        <p>Successfully sent the order.</p>
        <p>Thanks for ordering. See you soon !</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    )
  }

  return (
    <Modal
      key={userProgressCtx.progress}
      open={userProgressCtx.progress === "checkout"}
    >
      <form onSubmit={handelSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to send order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
