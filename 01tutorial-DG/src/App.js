import { useState, useEffect } from "react";
import "./index.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";

  //  * Hooks
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw Error(`Error ${response.status}: ${response.statusText}`);
        }

        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 500);
  }, []);

  // * Functions

  const addItem = async (item) => {
    const newID = items.length ? items[0].id + 1 : 1;
    const newItem = { id: newID, checked: false, item: item.trim() };

    const postOptions = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "body": JSON.stringify(newItem),
    };

    const response = await apiRequest(API_URL, postOptions);

    if (!response.ok) {
      setFetchError(response.error);
      setIsLoading(false);
      return;
    }

    const listItems = [...items, newItem];
    setItems(listItems);
    setIsLoading(false);
  };

  // * Handlers

  const handleCheck = async (id) => {
    setIsLoading(true);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    const myItem = listItems.find((item) => item.id === id);

    const patchOptions = {
      "method": "PATCH",
      "headers": {
        "Content-Type": "application/json",
      },
      "body": JSON.stringify({ "checked": myItem.checked }),
    };

    const requestURL = `${API_URL}/${id}`;

    const response = await apiRequest(requestURL, patchOptions);

    if (!response.ok) {
      setFetchError(response.error);
      setIsLoading(false);
      return;
    }

    setItems(listItems);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    const deleteOptions = {
      "method": "DELETE",
    };

    const requestURL = `${API_URL}/${id}`;

    const response = await apiRequest(requestURL, deleteOptions);

    if (!response.ok) {
      setFetchError(response.error);
      setIsLoading(false);
      return;
    }

    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    setIsLoading(false);
  };

  const handleNewItem = (e) => {
    e.preventDefault();
    if (!newItem) return;

    setIsLoading(true);
    setTimeout(() => addItem(newItem), 500);

    // addItem(newItem);
    setNewItem("");
  };

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.item.toLowerCase().includes(search.trim().toLowerCase())
    );
    return filteredItems;
  };

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem handleNewItem={handleNewItem} newItem={newItem} setNewItem={setNewItem} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={search ? handleSearch() : items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
