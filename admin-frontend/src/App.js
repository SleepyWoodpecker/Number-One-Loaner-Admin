import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StoreItemPage from "./pages/StoreItemPage";
import { getStoreItems } from "./services";

function App() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const loadStoreItems = async () => {
      const fetchedStoreItems = await getStoreItems();
      setStoreItems(fetchedStoreItems);
    };
    loadStoreItems();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage storeItems={storeItems} setStoreItems={setStoreItems} />
          }
        />
        <Route
          path="/store/:storeItemId"
          element={<StoreItemPage setStoreItems={setStoreItems} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
