import React, { useContext } from "react";
import Modal from "./Modal";
import { updateRequest, updateStoreItemsPostSizing } from "../services";
import EditingBox from "./EditingBox";
import { RequestContext } from "../App";
import { compareDates } from "../Functions";

// need to fix the CSS here
function LoanProcessModal({
  closeModal,
  request,
  setRequestList,
  storeItems,
  setStoreItems,
}) {
  // not sure if this works yet...
  const { setReturnAppointments } = useContext(RequestContext);
  const handleLoanApproval = async () => {
    const response = await updateStoreItemsPostSizing(request);
    const newList = storeItems.items.map((storeItem) => {
      const listLocation = response.findIndex(
        (responseItem) => storeItem.id === responseItem.id
      );
      // such an item exists
      if (listLocation > -1) {
        return response[listLocation];
      } else {
        return storeItem;
      }
    });
    setStoreItems({ ...storeItems, items: newList });
    // must remember to change the status of the request
    const newRequest = { ...request, status: "Awaiting Return" };
    const recordedNewRequest = await updateRequest(newRequest.id, newRequest);
    setRequestList((requestList) =>
      requestList.filter((request) => request.id !== recordedNewRequest.id)
    );
    setReturnAppointments((returnAppointments) =>
      returnAppointments
        .concat(recordedNewRequest)
        .sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
    );
    closeModal();
  };
  return (
    <Modal handleModalClose={closeModal}>
      <div className="flex justify-between items-center w-full h-5/6 flex-col">
        <div>
          <h1 className="font-bold text-xl">{request.requester}'s loan</h1>
          <hr
            style={{ borderColor: "#575757" }}
            className="mb-2 rounded-md h-1 w-full"
          />
        </div>
        {/* need a function to update the loan quantities */}
        <div>
          <ul className="font-semibold text-center flex justify-evenly w-full p-2 items-center">
            <li className="w-32">Item</li>
            <li className="w-32">Quantity</li>
          </ul>
          <ul className="w-full overflow-y-scroll" style={{ height: "17rem" }}>
            {request.requestedItems.map((requestedItem) => {
              return (
                <li
                  className="flex justify-evenly w-full p-2 items-center"
                  key={requestedItem.id}
                >
                  <div className="m-1 w-24 text-center">
                    {requestedItem.name}
                  </div>
                  <EditingBox
                    quantity={requestedItem.quantity}
                    request={request}
                    setRequestList={setRequestList}
                    itemId={requestedItem.id}
                    targetQuantity={"quantity"}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        {/* there has to be a confirm loan, where you downstock later */}
        <div
          className="rounded-md bg-green-200 p-3 font-bold mt-5"
          onClick={handleLoanApproval}
        >
          Confirm Loan
        </div>
      </div>
    </Modal>
  );
}

export default LoanProcessModal;
