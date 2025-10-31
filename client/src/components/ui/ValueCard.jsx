import React from "react";

const ValueCard = ({
  icon, // can be an <Icon /> component, emoji, or image URL
  paragraph,
  borderRadius = "12px",
  backgroundColor = "#ffffff",
  width = "260px",
  padding = "20px",
  shadow = "0 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign = "center",
}) => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
    borderRadius,
    width,
    padding,
    boxShadow: shadow,
    textAlign,
    gap: "12px",
  };

  const iconStyle = {
    fontSize: "2rem",
    color: "#2563EB", // default blue tone — can be overridden via icon prop
  };

  const paragraphStyle = {
    fontSize: "0.95rem",
    color: "#555",
    lineHeight: "1.4",
  };

  return (
    <div style={cardStyle}>
      {/* If icon is text or React element */}
      {React.isValidElement(icon) ? (
        <div style={iconStyle}>{icon}</div>
      ) : (
        icon && (
          <img
            src={icon}
            alt="icon"
            style={{ width: "40px", height: "40px" }}
          />
        )
      )}
      {paragraph && <p style={paragraphStyle}>{paragraph}</p>}
    </div>
  );
};

export default ValueCard;
