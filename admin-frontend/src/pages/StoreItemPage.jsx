import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAllVariations } from "../services";

function StoreItemPage() {
  const { storeItemId } = useParams();
  const [variations, setVariations] = useState(null);

  useEffect(() => {
    const loadVariations = async () => {
      const variations = await findAllVariations(storeItemId);
      setVariations(variations);
    };
    loadVariations();
  }, [storeItemId]);
  console.log(variations);
  return <div>{storeItemId}</div>;
}

export default StoreItemPage;
