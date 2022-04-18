import React from "react";

const ColorBox = ({ colorName }) => {
  return (
    <p className="color-box" style={{ "backgroundColor": colorName }}>
      {colorName ? colorName : "Empty Value"}
    </p>
  );
};

export default ColorBox;
