import React, { useContext } from "react";
import Modal from "./Modal";
import {
  updateRequest,
  addNewCalendarEvent,
  updateStoreItemsPostRequest,
} from "../services";
import { RequestContext } from "../pages/MainPage";
import { compareDates, showFeedbackMessage } from "../Functions";

function RequestDetailModal({
  closeModal,
  request,
  setRequestStatus,
  setRequestList,
  storeItems,
  setStoreItems,
}) {
  const generalButton = "rounded-md shadow-sm w-24 p-1";
  const { setSizingAppointments, setMessage } = useContext(RequestContext);

  const processReq = async (status) => {
    const newRequest = await updateRequest(request.id, {
      ...request,
      status,
    });
    setRequestStatus(status);
    // remove the approved request from the list
    setRequestList((requestList) => {
      return requestList.filter((request) => {
        return newRequest.id !== request.id;
      });
    });

    if (status === "Awaiting Sizing") {
      // add the approved request to the next list
      setSizingAppointments((sizingAppointments) =>
        sizingAppointments
          .concat(newRequest)
          .sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );

      const [hours, minutes] = request.time.split(":");
      const [year, month, day] = request.sizingDate.split("-");

      await addNewCalendarEvent(
        request.unit,
        [year, month - 1, day, hours, minutes],
        [year, month - 1, day, Number(hours) + 3, minutes],
        request.email,
        "sizing"
      );
      const storeResponse = await updateStoreItemsPostRequest(request);
      const lowStockItems = [];
      storeResponse.forEach((storeItem) => {
        if (storeItem.quantity / storeItem.originalQuantity < 0.2) {
          lowStockItems.push(storeItem.name);
        }
      });
      if (lowStockItems.length > 0) {
        showFeedbackMessage(
          `The following items are low on stock: ${lowStockItems.join(", ")}`,
          "red",
          setMessage,
          5000
        );
      }
      const newList = storeItems.items.map((storeItem) => {
        // only change the quantity of the consolidates items
        const listLocation = storeResponse.findIndex(
          (responseItem) => storeItem.id === responseItem.id
        );
        // such an item exists
        if (listLocation > -1) {
          return storeResponse[listLocation];
        } else {
          return storeItem;
        }
      });
      setStoreItems((storeItems) => ({ ...storeItems, items: newList }));
    }
    closeModal();
    // should probably show a user notification afterwards
  };
  return (
    <Modal handleModalClose={closeModal}>
      <div className="flex justify-between items-center w-full h-5/6 flex-col">
        <div>
          <div className="font-semibold text-lg mb-3 flex justify-between w-40">
            <h2>{request.requester}</h2>
            <h2>{request.unit}</h2>
          </div>
          <div className="flex flex-col items-center w-40 mb-3">
            <h2 className="font-semibold">Sizing: {request.sizingDate}</h2>
            <h2 className="font-semibold">Return: {request.returnDate}</h2>
          </div>
        </div>
        <div>
          <ul className="font-semibold text-center flex justify-evenly w-full items-center">
            <li className="w-32">Item</li>
            <li className="w-32">Quantity</li>
          </ul>
          <ul className="overflow-y-scroll" style={{ height: "16rem" }}>
            {request.requestedItems.map((item) => {
              return (
                <li
                  className="flex justify-evenly items-center p-2"
                  key={item.id}
                >
                  <p className="w-32 text-center">{item.name}</p>
                  <p className="w-24 text-center">{item.quantity}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly mt-8">
        <button
          className={`${generalButton} bg-red-200`}
          onClick={() => processReq("Rejected")}
        >
          Reject
        </button>
        <button
          className={`${generalButton} bg-green-200`}
          onClick={() => processReq("Awaiting Sizing")}
        >
          Approve
        </button>
      </div>
    </Modal>
  );
}

export default RequestDetailModal;
