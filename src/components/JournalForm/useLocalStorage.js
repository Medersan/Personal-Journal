import { useEffect,useState } from "react";

const useLocalStorage = (key) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res) setData(res);
  }, []);
  const savedData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };
  return [data, savedData];
};

export default useLocalStorage;