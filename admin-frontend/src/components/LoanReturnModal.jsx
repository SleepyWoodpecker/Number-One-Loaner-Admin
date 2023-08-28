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
    setStoreItems((storeItems) =>
      storeItems.map((storeItem) => {
        const listLocation = updatedStoreItems.findIndex(
          (responseItem) => storeItem.id === responseItem.id
        );
        // such an item exists
        if (listLocation > -1) {
          return updatedStoreItems[listLocation];
        } else {
          return storeItem;
        }
      })
    );
    closeModal();
  };

  const tableHeaderClass = "text-center m-4";
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
            className="mb-2 rounded-md h-1 w-full"
          />
          <h3>Key in the number of items returned</h3>
        </div>
        <table className=" w-full text-center table-fixed border-collapse">
          <tbody>
            <tr className="grid-cols-3">
              <th className={tableHeaderClass}>Name</th>
              <th className={tableHeaderClass}>Outstanding</th>
              <th className={tableHeaderClass}>Returned</th>
            </tr>
            {/* <ul className="w-full"> */}
            {request.requestedItems.map((requestedItem, i) => {
              const initialDifference =
                requestedItem.quantity - requestedItem.returnedQuantity;
              return (
                <tr className="grid-cols-3" key={requestedItem.id}>
                  <td className="m-1 text-center w-24">{requestedItem.name}</td>
                  <td className="mx-2 w-8">{initialDifference}</td>
                  <td>
                    <EditingBox
                      quantity={requestedItem.returnedQuantity}
                      request={request}
                      setRequestList={setRequestList}
                      itemId={requestedItem.id}
                      targetQuantity="returnedQuantity"
                    />
                  </td>
                </tr>
              );
            })}
            {/* </ul> */}
          </tbody>
        </table>
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
