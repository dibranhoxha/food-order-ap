import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { ...state, value: action.value };
  }
  if (action.type === "BLUR") {
    return { ...state, isTouched: true };
  }
  if (action.type === "RESET") {
    return initialState;
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, inputDispatch] = useReducer(
    inputStateReducer,
    initialState
  );

  const enteredValueIsValid = validateValue(inputState.value);
  const hasError = !enteredValueIsValid && inputState.isTouched;

  const valueChangedHandler = (event) => {
    inputDispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    inputDispatch({ type: "BLUR" });
  };

  const reset = () => {
    inputDispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: enteredValueIsValid,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
