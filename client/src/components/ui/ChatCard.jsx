import React from "react";

const ChatCard = ({
  header,
  paragraph,
  children, // usually your CustomButton
  borderRadius = "12px",
  backgroundColor = "#ffffff",
  width = "320px",
  padding = "16px",
  shadow = "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign = "left",
}) => {
  const cardStyle = {
    borderRadius,
    backgroundColor,
    width,
    padding,
    boxShadow: shadow,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign,
    gap: "12px",
  };

  const headerStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "6px",
  };

  const paragraphStyle = {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: children ? "10px" : "0",
    lineHeight: "1.4",
  };

  return (
    <div style={cardStyle}>
      {header && <h3 style={headerStyle}>{header}</h3>}
      {paragraph && <p style={paragraphStyle}>{paragraph}</p>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default ChatCard;
