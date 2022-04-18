import { useState } from "react";
import ColorBox from "./ColorBox";
import NameInput from "./NameInput";

function App() {
  const [colorName, setColorName] = useState("");

  return (
    <div className="App">
      <ColorBox colorName={colorName} />
      <NameInput colorName={colorName} setColorName={setColorName} />
    </div>
  );
}

export default App;
