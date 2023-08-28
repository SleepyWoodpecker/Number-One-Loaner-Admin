import React from "react";
import RecordItem from "./RecordItem.jsx";

function RecordGallery({
  requests,
  setRequests,
  type,
  storeItems,
  setStoreItems,
}) {
  let requestGallery;
  if (requests === null) {
    <div className="rounded-md shadow-md py-3 px-4 my-2 flex justify-between border-2 border-gray-100 w-full"></div>;
  } else if (requests.length === 0) {
    requestGallery = "No new requests";
  } else {
    requestGallery = requests.map((request) => {
      return (
        <RecordItem
          key={request.id}
          request={request}
          requestList={requests}
          setRequestList={setRequests}
          type={type}
          storeItems={storeItems}
          setStoreItems={setStoreItems}
        />
      );
    });
  }

  return (
    <div className="w-full overflow-scroll mt-4" style={{ height: "12.5rem" }}>
      {requestGallery}
    </div>
  );
}

export default RecordGallery;
