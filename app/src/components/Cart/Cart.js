import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContext from "./../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const { isLoading, error, successMessage, sendRequest } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  if(successMessage) {
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          name={item.name}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    sendRequest({
      url: "https://food-order-app-42d60-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: { userData, orderItems: cartCtx.items },
    });
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  let modalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          loading={isLoading}
        />
      )}
      {!isCheckout && modalActions}
    </>
  );

  if (error) {
    modalContent = (
      <>
        <div className={styles.actionsError}>
          <p>{error}</p>
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      </>
    );
  }

  if (isLoading) {
    modalContent = (
      <>
        <div className={styles.actionsSubmitting}>
          <p>Submitting..</p>
        </div>
      </>
    );
  }

  if(successMessage) {
    modalContent =  <>
    <div className={styles.actions}>
      <h3>{successMessage}</h3>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
  </>
  }

  return <Modal onClose={props.onClose}>{modalContent}</Modal>;
};

export default Cart;
