import { useState } from "react";
import "./Button.css";
const Button = ({
  disabled = false,
  onClick = () => {},
  label = "Button",
  className = "",
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button disabled={disabled} className={className} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
