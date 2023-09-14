import React, { useState, useRef } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsCheck2, BsX } from "react-icons/bs";
import CustomInput from "./CustomInput";

function StoreItemEditingBox({ item, setQuantity }) {
  const originalQuantity = useRef(item.quantity);
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const handleEditClick = () => setIsEditing(true);
  // missing verification
  const handleChangeQuantity = () => {
    setQuantity(item.id, newQuantity);
    handleCloseEditor();
  };
  const handleCloseEditor = () => setIsEditing(false);
  return (
    <div className="relative p-1">
      {isEditing ? (
        <div className="flex justify-around items-center">
          <CustomInput
            width="14"
            input={newQuantity}
            handleInputChange={(e) => setNewQuantity(e.target.value)}
          />
          <div className="flex justify-between items-center -mr-1">
            <BsCheck2
              size={20}
              onClick={() => handleChangeQuantity(newQuantity)}
            />
            <BsX size={22} onClick={handleCloseEditor} />
          </div>
        </div>
      ) : (
        <>
          <HiOutlinePencilSquare
            size={18}
            onClick={handleEditClick}
            className="absolute top-1 right-1"
            color="#807d7d"
          />
          <p>{newQuantity}</p>
        </>
      )}
      <div className="w-14 h-0"></div>
    </div>
  );
}

export default StoreItemEditingBox;
