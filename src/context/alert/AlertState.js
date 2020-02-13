import React, { useReducer } from "react";
import alertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { REMOVE_ALERT, SET_ALERT } from "../types";

const AlertState = props => {
  const initialState = {
    alert: null
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, types) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, types }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 2000);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        setAlert
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
