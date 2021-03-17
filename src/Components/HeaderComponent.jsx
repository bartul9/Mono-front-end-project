import React from "react";

// Styles
import "./HeaderComponent.css";

function HeaderComponent({ background, text, textColor, textShadow }) {
  return (
    <header
      style={{ backgroundImage: `url(${background})` }}
      className="HeaderComponent"
    >
      <h1
        style={{
          color: textColor,
          textShadow: textShadow,
        }}
      >
        {text}
      </h1>
    </header>
  );
}
export default HeaderComponent;
