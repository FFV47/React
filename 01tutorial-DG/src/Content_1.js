import { useState } from "react";

const Content = () => {
  const [name, setName] = useState("Fernando");

  const [count, setCount] = useState(0);

  const handleNameChange = () => {
    const names = ["Fernando", "Juan", "Pedro"];
    const int = Math.floor(Math.random() * names.length);
    setName(names[int]);
  };

  const handleClick = () => {
    // Hooks run after the logic in the function component, and before render
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };
  const handleClick2 = (name) => {
    console.log(`${name} was clicked!`);
  };
  const handleClick3 = (e) => {
    console.log(e.target.textContent);
  };

  return (
    <main>
      <p onDoubleClick={handleClick}>Hello {name}</p>

      <p>Count: {count}</p>

      <button onClick={handleClick}>Count</button>

      <button onClick={handleNameChange}>Change Name</button>
      <button onClick={() => handleClick2(handleNameChange())}>Click 2</button>
      <button onClick={(e) => handleClick3(e)}>Click 3</button>
    </main>
  );
};

export default Content;
