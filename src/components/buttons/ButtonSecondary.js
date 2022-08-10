import React from "react";
import "./index.css";

function ButtonSecondary(props) {
  const { buttonNewStyle, children, disable, ...otherProps } = props;

  return (
    <div
      className="button-secondary"
      disable={disable}
      style={buttonNewStyle}
      {...otherProps}
    >
      {children}
    </div>
  );
}

export default ButtonSecondary;
