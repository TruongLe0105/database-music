import React from "react";
import "./index.css";

function ButtonPrimary(props) {
  const { buttonStyle, children, disable, ...otherProps } = props;

  return (
    <div className="button-primary" disable={disable} style={buttonStyle}>
      <div>{children}</div>
    </div>
  );
}

export default ButtonPrimary;
