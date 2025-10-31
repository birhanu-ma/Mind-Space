import React from "react";

const CustomButton = ({
  children,
  color = "#4F46E5", // background color
  width = "150px",
  borderRadius = "8px",
  onClick = () => {},
  textColor = "#fff",
  padding = "10px 20px",
  fontSize = "16px",
}) => {
  const buttonStyle = {
    backgroundColor: color,
    border: "none",
    borderRadius,
    width,
    padding,
    color: textColor,
    fontSize,
    cursor: "pointer",
    transition: "0.2s ease",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
      onMouseLeave={(e) => (e.target.style.opacity = 1)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
