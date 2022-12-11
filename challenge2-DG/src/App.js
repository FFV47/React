import Content from "./Content";
import { useState, useEffect } from "react";
import Header from "./Header";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com";

  const [items, setItems] = useState([]);
  const [path, setPath] = useState("users");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${path}`);

        if (response.ok) {
          const items = await response.json();
          setItems(items);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [path]);

  return (
    <div className="App">
      <Header setPath={setPath} />
      {!isLoading && items.length && <Content items={items}></Content>}
    </div>
  );
}

export default App;
