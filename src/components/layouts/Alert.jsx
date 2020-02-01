import React from "react";

export const Alert = ({ alert }) => {
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
