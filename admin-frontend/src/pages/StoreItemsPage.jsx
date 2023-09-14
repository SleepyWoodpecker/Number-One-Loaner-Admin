import React from "react";
import ItemTable from "../components/ItemTable";

function StoreItemsPage({ storeItems, setStoreItems }) {
  // fix sizing bruh
  return (
    <div className="h-full flex justify-center">
      <div className="overflow-y-scroll" style={{ height: "92%" }}>
        <ItemTable storeItems={storeItems} setStoreItems={setStoreItems} />
      </div>
    </div>
  );
}

export default StoreItemsPage;
