import React, { useEffect, useState } from "react";
import { findAllAssociatedRequests } from "../services";
import RecordGallery from "./RecordGallery";

function UpcomingReturns({ variationOrSizeHeader, mainItem }) {
  // if the item has variations, should search for the consolidatedItemId. Else search for just its ID
  const [requests, setRequests] = useState(null);
  let hasSize = true;
  if (variationOrSizeHeader === "") {
    hasSize = false;
  }
  useEffect(() => {
    const fillRequests = async () => {
      const associatedRequests = await findAllAssociatedRequests(
        hasSize,
        mainItem.id
      );
      setRequests(associatedRequests);
    };
    fillRequests();
  }, [hasSize, mainItem.id]);

  return (
    <div style={{ width: "20.5rem" }} className="-mt-4">
      <RecordGallery requests={requests} type="Item Tracking" />
    </div>
  );
}

export default UpcomingReturns;
