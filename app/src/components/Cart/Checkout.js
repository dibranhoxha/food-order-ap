import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: street,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangedHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);

  const {
    value: postalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangedHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isFiveChars);

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangedHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  formIsValid =
    nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const userData = {
      name,
      street,
      postalCode,
      city
    }

    props.onConfirm(userData);

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const checkHasError = (hasError) => {
    let errorClass = classes.control;
    if (hasError) {
      errorClass += ` ${classes.invalid}`;
    }
    return errorClass;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={checkHasError(nameHasError)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={checkHasError(streetHasError)}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={checkHasError(postalCodeHasError)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChangedHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={checkHasError(cityHasError)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
        {props.loading ? 'Ordering...':'Confirm'}
        </button>
      </div>
    </form>
  );
};

export default Checkout;
