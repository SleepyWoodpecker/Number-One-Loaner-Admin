import React, { useState, useRef, useContext } from "react";
import CustomInput from "./CustomInput";
import { BsCheck2, BsX } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { validateQuantity, showFeedbackMessage } from "../Functions";
import { RequestContext } from "../App";

function EditingBox({
  quantity,
  request,
  setRequestList,
  item,
  targetQuantity,
}) {
  const originalQuantity = useRef(quantity);
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const { setMessage } = useContext(RequestContext);
  const handleEditClick = () => setIsEditing(true);
  const handleCloseEditor = () => {
    verifyQuantity(newQuantity);
    setIsEditing(false);
  };
  // if I wanna speed up the app, maybe I should not update the DB after each change?
  const handleChangeQuantity = async (itemId) => {
    if (verifyQuantity(newQuantity)) {
      const newList = request.requestedItems.map((requestedItem) => {
        if (requestedItem.id === itemId) {
          return { ...requestedItem, [targetQuantity]: Number(newQuantity) };
        } else {
          return requestedItem;
        }
      });
      const updatedRequest = { ...request, requestedItems: newList };
      setRequestList((requestList) =>
        requestList.map((originalRequest) => {
          if (originalRequest.id === request.id) {
            return updatedRequest;
          } else {
            return originalRequest;
          }
        })
      );
    }
    setIsEditing(false);
  };

  const verifyQuantity = (quantity) => {
    if (quantity === "") {
      setNewQuantity(originalQuantity.current);
      return false;
    } else if (newQuantity > item.quantity) {
      setNewQuantity(originalQuantity.current);
      showFeedbackMessage(
        `Returned quantity of ${item.name} cannot be more than loaned quantity`,
        "red",
        setMessage,
        3500
      );
      return false;
    } else {
      return validateQuantity(quantity);
    }
  };
  // const displayQuantity = request.returnedQuantity ? request.returnedQuantity

  return (
    <div className="flex justify-around" style={{ width: "6.3rem" }}>
      <div className="m-1 mx-2 w-6 flex justify-center items-center">
        {isEditing ? (
          <CustomInput
            input={newQuantity}
            setInput={setNewQuantity}
            width={10}
          />
        ) : (
          newQuantity
        )}
      </div>

      {isEditing ? (
        <div
          style={{ width: 50 }}
          className="flex justify-between items-center p-0.5"
        >
          <BsCheck2 size={20} onClick={() => handleChangeQuantity(item.id)} />
          <BsX size={24} onClick={handleCloseEditor} />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <HiOutlinePencilSquare size={18} onClick={handleEditClick} />
        </div>
      )}
    </div>
  );
}

export default EditingBox;
