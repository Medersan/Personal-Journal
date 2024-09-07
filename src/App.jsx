import { useEffect, useState } from "react";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import Body from "./components/layout/Body/Body";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import UserContextProvider from "./components/context/UserContext";
import useLocalStorage from "./components/JournalForm/useLocalStorage";

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItems, setSelectedItems] = useState({});
  const [addNewMemory, setAddNewMemory] = useState(0);

  // Function to map items
  const mapItems = (items) => items.map((item) => ({ ...item }));

  // Load data from localStorage on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) || [];
    if (Array.isArray(data)) {
      setItems(data.map((item) => ({ ...item, date: new Date(item.date) })));
    }
  }, []);

  // Persist data to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

  // Add new or update an existing item
  const addItem = (item) => {
    const isExistingItem = item.id;

    const updatedItems = isExistingItem
      ? mapItems(items).map((i) => (i.id === item.id ? { ...item } : i))
      : [
          ...items,
          {
            ...item,
            id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
            date: new Date(item.date), // Ensure date is a valid Date object
          },
        ];

    setItems(updatedItems);
  };
  const handleDelete = (id) => {
    setItems([...items.filter(i=>i.id !== id)])
  }
  

  return (
    <div className="lg:flex sm:block">
      <UserContextProvider>
        <Body>
          <Header />
          <Button
            text="+ New Memory"
            className="text-white bg-black border-none w-full"
            onClick={() => setAddNewMemory(prev=>prev+1)}
          />
          <JournalList items={items} setItems={setSelectedItems}/>
        </Body>
        <Sidebar>
          <JournalForm
            onDelete={handleDelete}
            onSubmit={addItem}
            data={selectedItems}
            newMemory={addNewMemory}
          />
        </Sidebar>
      </UserContextProvider>
    </div>
  );
}

export default App;
