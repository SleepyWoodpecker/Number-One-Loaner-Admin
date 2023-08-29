import React, { useContext } from "react";
import Modal from "./Modal";
import {
  updateRequest,
  addNewCalendarEvent,
  updateStoreItemsPostRequest,
} from "../services";
import { RequestContext } from "../App";
import { compareDates } from "../Functions";

function RequestDetailModal({
  closeModal,
  request,
  setRequestStatus,
  setRequestList,
  storeItems,
  setStoreItems,
}) {
  const generalButton = "rounded-md shadow-sm w-24 p-1";
  const { setSizingAppointments } = useContext(RequestContext);

  const processReq = async (status) => {
    const newRequest = await updateRequest(request.id, {
      ...request,
      status,
    });
    console.log(newRequest);
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
        request.email
      );

      const storeResponse = await updateStoreItemsPostRequest(request);
      const newList = storeItems.items.map((storeItem) => {
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
          <div className="flex flex-col items-center w-40">
            <h2 className="font-semibold">Sizing: {request.sizingDate}</h2>
            <h2 className="font-semibold">Return: {request.returnDate}</h2>
          </div>
        </div>
        <div className="overflow-y-scroll" style={{ height: "16rem" }}>
          <table className="table-fixed">
            <thead>
              <tr className="font-semibold text-center">
                <td>Item</td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody className="grid-cols-2 m-1 ">
              {request.requestedItems.map((item) => {
                return (
                  <tr
                    className="grid-cols-2 text-center text-center"
                    key={item.id}
                  >
                    <td className="w-32">{item.name}</td>
                    <td className="w-24">{item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
