import React from "react";

const NameInput = ({ colorName, setColorName }) => {
  return (
    <form className="nameForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="name">Add color name</label>
      <input
        autoFocus
        required
        type="text"
        id="name"
        placeholder="Add color name"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
      />
    </form>
  );
};

export default NameInput;
