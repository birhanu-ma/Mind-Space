import React from "react";

const Card = ({
  image,
  header,
  paragraph,
  children, // or use a `button` prop if you prefer
  width = "300px",
  borderRadius = "12px",
  padding = "16px",
  backgroundColor = "#fff",
  shadow = "0 4px 10px rgba(0,0,0,0.1)",
}) => {
  const cardStyle = {
    width,
    borderRadius,
    backgroundColor,
    boxShadow: shadow,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding,
    textAlign: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  };

  const headerStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "8px",
  };

  const paragraphStyle = {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "16px",
  };

  return (
    <div style={cardStyle}>
      {image && <img src={image} alt={header} style={imgStyle} />}
      {header && <h3 style={headerStyle}>{header}</h3>}
      {paragraph && <p style={paragraphStyle}>{paragraph}</p>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Card;
