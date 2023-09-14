import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findAllVariations } from "../services";
import TopBar from "../components/TopBar";
import { IoIosArrowRoundBack } from "react-icons/io";
import StoreItemVariationDisplay from "../components/StoreItemVariationDisplay";

function StoreItemPage() {
  const { storeItemId } = useParams();
  const [variations, setVariations] = useState(null);
  const [mainItem, setMainItem] = useState(null);

  useEffect(() => {
    const loadVariations = async () => {
      const [main, ...variation] = await findAllVariations(storeItemId);
      setMainItem(main);
      setVariations(variation);
    };
    loadVariations();
  }, [storeItemId]);

  return mainItem ? (
    <div>
      <Link to="/">
        <TopBar />
      </Link>

      <div
        className="p-4 pt-7 mb-8 mt-8 mid-point-2:max-w-md mid-point-2:mx-auto overflow-y-scroll relative"
        style={{ height: "90vh" }}
      >
        <Link to="/">
          <IoIosArrowRoundBack
            size={30}
            color="#909191"
            className="absolute top-6 left-3"
          />
        </Link>
        <div className="mt-1">
          <StoreItemVariationDisplay
            mainItem={mainItem}
            variations={variations}
          />
        </div>
      </div>
      <div
        className="bg-orange-200 fixed bottom-0 left-0 right-0 pb-2 h-12 "
        style={{
          boxShadow:
            "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      ></div>
    </div>
  ) : (
    "Loading"
  );
}

export default StoreItemPage;
