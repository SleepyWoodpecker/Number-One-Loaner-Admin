import React, { useState, useRef } from "react";
import RecordGallery from "./RecordGallery";
import SearchBar from "./SearchBar";

function RequestTab({
  requests,
  setRequests,
  title,
  type,
  storeItems,
  setStoreItems,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const originalRequests = useRef(requests);

  const handleSearchInput = (e) => {
    const searchInput = e.target.value;
    setSearchTerm(searchInput);
    setRequests(
      originalRequests.current.filter((request) =>
        request.requester.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  return (
    <div style={{ width: "20rem" }}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold">{title}</h1>
        <SearchBar
          handleSearchInput={handleSearchInput}
          searchTerm={searchTerm}
        />
      </div>

      <div>
        <RecordGallery
          requests={requests}
          setRequests={setRequests}
          type={type}
          storeItems={storeItems}
          setStoreItems={setStoreItems}
        />
      </div>
    </div>
  );
}

export default RequestTab;
