import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

export const Alert = () => {
  const context = useContext(AlertContext);
  const { alert } = context;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i
          className="fa fa-info-circle"
          style={{ marginRight: "4px" }}
          aria-hidden="true"
        ></i>
        {alert.msg}
      </div>
    )
  );
};
