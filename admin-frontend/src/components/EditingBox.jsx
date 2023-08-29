import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { BsCheck2, BsX } from "react-icons/bs";

function EditingBox({
  quantity,
  request,
  setRequestList,
  itemId,
  targetQuantity,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const handleEditClick = () => setIsEditing(true);
  const handleCloseEditor = () => setIsEditing(false);
  // if I wanna speed up the app, maybe I should not update the DB after each change?
  const handleChangeQuantity = async (itemId) => {
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
    // await updateRequest(updatedRequest.id, updatedRequest);
    // no need to update store items since the page needs to re-render when you change a tab?
    setIsEditing(false);
  };

  // const displayQuantity = request.returnedQuantity ? request.returnedQuantity

  return (
    <div className="flex justify-around">
      <div className="m-1 mx-2 w-6 flex justify-center items-center">
        {isEditing ? (
          <CustomInput input={newQuantity} setInput={setNewQuantity} />
        ) : (
          newQuantity
        )}
      </div>

      {isEditing ? (
        <div
          style={{ width: 50 }}
          className="flex justify-between items-center p-0.5"
        >
          <BsCheck2 size={20} onClick={() => handleChangeQuantity(itemId)} />
          <BsX size={24} onClick={handleCloseEditor} />
        </div>
      ) : (
        <div
          className="rounded-md bg-orange-200 text-sm  p-1 w-12 flex items-center justify-center"
          onClick={handleEditClick}
        >
          Edit
        </div>
      )}
    </div>
  );
}

export default EditingBox;
