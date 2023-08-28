import React from "react";
import ItemTable from "../components/ItemTable";

function StoreItemsPage({ storeItems, setStoreItems }) {
  return (
    <div>
      <ItemTable storeItems={storeItems} setStoreItems={setStoreItems} />
    </div>
  );
}

export default StoreItemsPage;
