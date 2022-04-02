import React, { Fragment } from "react";

import mealsImage from "../../assets/images/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h2>E-Food</h2>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
