import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteStoreItem, findAllVariations } from "../services";
import TopBar from "../components/TopBar";
import { IoIosArrowRoundBack } from "react-icons/io";
import StoreItemVariationDisplay from "../components/StoreItemVariationDisplay";
import { RiDeleteBin6Line } from "react-icons/ri";

function StoreItemPage({ setStoreItems }) {
  const { storeItemId } = useParams();
  const [variations, setVariations] = useState(null);
  const [mainItem, setMainItem] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadVariations = async () => {
      const [main, ...variation] = await findAllVariations(storeItemId);
      setMainItem(main);
      setVariations(variation);
    };
    loadVariations();
  }, [storeItemId]);

  const setMainItemQuantity = (id, newQuantity) => {
    setMainItem((mainItem) => ({ ...mainItem, quantity: newQuantity }));
  };

  const setMainItemOriginalQuantity = (id, newQuantity) => {
    setMainItem((mainItem) => ({ ...mainItem, originalQuantity: newQuantity }));
  };

  const setVariationQuantity = (id, newQuantity) => {
    setVariations((variations) =>
      variations.map((variation) => {
        return variation.id === id
          ? { ...variation, quantity: newQuantity }
          : { ...variation };
      })
    );
  };

  const setVariationOriginalQuantity = (id, newQuantity) => {
    console.log(
      variations.map((variation) => {
        return variation.id === id
          ? { ...variation, originalQuantity: newQuantity }
          : { ...variation };
      })
    );
    setVariations((variations) =>
      variations.map((variation) => {
        return variation.id === id
          ? { ...variation, originalQuantity: newQuantity }
          : { ...variation };
      })
    );
  };

  const handleDeleteItem = async () => {
    if (window.confirm(`Delete this item?`)) {
      const deletedItem = await deleteStoreItem(storeItemId);
      // only need to filter the main items
      setStoreItems((storeItems) => ({
        ...storeItems,
        items: storeItems.items.filter(
          (mainItem) => mainItem.id !== deletedItem.id
        ),
      }));
      return navigate("/");
    }
  };

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
        <RiDeleteBin6Line
          size={20}
          color="#909191"
          className="absolute top-8 right-3"
          onClick={handleDeleteItem}
        />

        <div className="mt-1">
          <StoreItemVariationDisplay
            mainItem={mainItem}
            setMainItemQuantity={setMainItemQuantity}
            setMainItemOriginalQuantity={setMainItemOriginalQuantity}
            variations={variations}
            setVariationQuantity={setVariationQuantity}
            setVariationOriginalQuantity={setVariationOriginalQuantity}
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
      <div className="w-10 h-0"></div>
      <div className="w-14 h-0"></div>
    </div>
  ) : (
    "Loading"
  );
}

export default StoreItemPage;
