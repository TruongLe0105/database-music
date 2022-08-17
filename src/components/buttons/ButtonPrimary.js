import React from "react";
import "./index.css";

function ButtonPrimary(props) {
  const { buttonStyle, children, disable, handleSubmit, ...otherProps } = props;

  return (
    <div onClick={handleSubmit} className="button-primary" disable={disable} style={buttonStyle}>
      <div>{children}</div>
    </div>
  );
}

export default ButtonPrimary;
