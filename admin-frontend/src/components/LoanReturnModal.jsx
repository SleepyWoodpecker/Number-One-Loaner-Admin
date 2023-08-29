import React, { useContext, useRef } from "react";
import Modal from "./Modal";
import EditingBox from "./EditingBox";
import { updateRequest, updateStoreItemsPostReturn } from "../services";
import { RequestContext } from "../App";
import { compareDates } from "../Functions";

function LoanReturnModal({
  request,
  requestList,
  setRequestList,
  closeModal,
  setStoreItems,
  setRequestStatus,
}) {
  const { setCompleteReturns } = useContext(RequestContext);
  // store the old request to add
  const prevReq = useRef(request);
  const handleReturn = async () => {
    let finalStatus = "";
    request.requestedItems.forEach((requestedItem, i, arr) => {
      const outstanding =
        requestedItem.quantity - requestedItem.returnedQuantity;
      if (outstanding !== 0) {
        finalStatus = "Incomplete Return";
      } else if (
        outstanding === 0 &&
        i === arr.length - 1 &&
        finalStatus !== "Incomplete Return"
      ) {
        finalStatus = "Return Complete";
      }
    });
    setRequestStatus(finalStatus);
    const updatedRequest = await updateRequest(request.id, {
      ...request,
      status: finalStatus,
    });
    // only remove if it becomes a complete return
    if (finalStatus === "Return Complete") {
      const updatedRequestList = requestList.filter((requestItem) => {
        return requestItem.id !== updatedRequest.id;
      });
      setRequestList(updatedRequestList);
      setCompleteReturns((completeReturns) =>
        completeReturns
          .concat(updatedRequest)
          .sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );
    }
    // adjust the quantities of the store items nonetheless
    const updatedStoreItems = await updateStoreItemsPostReturn({
      ...updatedRequest,
      prevReq: prevReq.current,
    });
    setStoreItems((storeItems) => {
      const mainStoreList = storeItems.items.map((storeItem) => {
        const listLocation = updatedStoreItems.findIndex(
          (responseItem) => storeItem.id === responseItem.id
        );
        // such an item exists
        if (listLocation > -1) {
          return updatedStoreItems[listLocation];
        } else {
          return storeItem;
        }
      });
      return { ...storeItems, items: mainStoreList };
    });
    closeModal();
  };

  const tableHeaderClass = "text-center w-24";
  return (
    <Modal handleModalClose={closeModal}>
      <div className="flex justify-between items-center w-full h-full flex-col">
        <div>
          <h1 className="font-bold text-xl text-center">Outstanding items</h1>
          <h1 className="font-bold text-xl text-center">
            on {request.requester}'s loan
          </h1>
          <hr
            style={{ borderColor: "#575757" }}
            className="mb-1 rounded-md h-1 w-full"
          />
        </div>
        <div className="flex flex-col">
          <ul className="w-full text-center font-semibold flex justify-evenly">
            <li className={tableHeaderClass} style={{ width: "6.5rem" }}>
              Name
            </li>
            <li className={tableHeaderClass} style={{ width: "5.5rem" }}>
              Outstanding
            </li>
            <li className={tableHeaderClass}>Returned</li>
          </ul>
          <ul
            className="flex flex-col overflow-y-scroll"
            style={{ height: "16rem" }}
          >
            {request.requestedItems.map((requestedItem, i) => {
              const initialDifference =
                requestedItem.quantity - requestedItem.returnedQuantity;
              return (
                <li className="flex flex-start my-1" key={requestedItem.id}>
                  <p className="text-center" style={{ width: "6.5rem" }}>
                    {requestedItem.name}
                  </p>

                  <p
                    className="mx-2 flex justify-center items-center"
                    style={{ width: "4.5rem" }}
                  >
                    {initialDifference}
                  </p>

                  <EditingBox
                    quantity={requestedItem.returnedQuantity}
                    request={request}
                    setRequestList={setRequestList}
                    itemId={requestedItem.id}
                    targetQuantity="returnedQuantity"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div
            className="bg-green-200 rounded-md m-2 p-3"
            onClick={handleReturn}
          >
            Confirm Return
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoanReturnModal;
