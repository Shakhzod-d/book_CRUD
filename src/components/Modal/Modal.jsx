import React from "react";

import "./Modal.css";

export const Modal = ({ open, children }) => {
  return (
    <div className={open ? `wrapper` : `hide_modal`}>
      <div className="modal">{children}</div>
    </div>
  );
};
