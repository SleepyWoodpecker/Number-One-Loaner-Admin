import React, { useState, useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsCheck2, BsX } from "react-icons/bs";
import CustomInput from "./CustomInput";
import { adjustStoreQuantity } from "../services";

function StoreItemEditingBox({
  item,
  setQuantity,
  field,
  quantity,
  width = 10,
}) {
  const originalQuantity = useRef(quantity);
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCloseEditor = () => {
    setIsEditing(false);
  };
  // missing verification
  const handleChangeQuantity = async (field) => {
    setQuantity(item.id, newQuantity);
    if (quantity === "") {
      setNewQuantity(originalQuantity.current);
    }
    await adjustStoreQuantity({
      ...item,
      quantity: newQuantity,
      type: item.consolidatedItemId ? "variation" : "main",
      field,
      preEditingQuantity: originalQuantity.current,
    });

    handleCloseEditor();
  };
  return (
    <div className="relative p-0.5">
      {isEditing ? (
        <div className="flex justify-center items-center">
          <CustomInput
            width={width}
            input={newQuantity}
            handleInputChange={(e) => setNewQuantity(e.target.value)}
          />
          <div className="flex justify-between items-center -mr-1">
            <BsCheck2 size={20} onClick={() => handleChangeQuantity(field)} />
            <BsX size={22} onClick={handleCloseEditor} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <HiOutlinePencilSquare
              size={18}
              onClick={handleEditClick}
              className="absolute top-1 right-1"
              color="#807d7d"
            />
          </div>
          <p className={item.consolidatedItemId ? "mr-2" : ""}>{newQuantity}</p>
        </>
      )}
      <div className={`w-${width} h-0`}></div>
    </div>
  );
}

export default StoreItemEditingBox;
