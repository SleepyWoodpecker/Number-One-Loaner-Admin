import React, { useContext } from "react";
import Modal from "./Modal";
import { deleteRequest, checkUserLogin } from "../services";
import { showFeedbackMessage } from "../Functions";
import { RequestContext } from "../App";

function CompleteOrderModal({ request, setRequestList, closeModal }) {
  const { setMessage, handleAuthClick } = useContext(RequestContext);

  const handleRecordDeletion = async () => {
    const user = await checkUserLogin();
    if (user.error) {
      closeModal();
      showFeedbackMessage(user.error, "red", setMessage, 5000);
      return handleAuthClick();
    }
    const deletedRequest = await deleteRequest(request.id, user);
    setRequestList((requestList) =>
      requestList.filter((request) => request.id !== deletedRequest.id)
    );
  };

  return (
    <Modal handleModalClose={closeModal}>
      <div className="flex flex-col justify-around items-center">
        <div className="font-semibold text-lg mb-3 flex justify-between w-44 ml-5 mb-5">
          <h2>{request.requester}</h2>
          <h2>{request.unit}</h2>
        </div>
        <div>
          <ul className="font-semibold text-center flex justify-evenly w-full items-center">
            <li className="w-32">Item</li>
            <li className="w-32">Quantity</li>
          </ul>
          <ul className="overflow-y-scroll" style={{ height: "18rem" }}>
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
        <div
          className="rounded-md shadow-sm w-40 p-1 bg-red-200 text-center mt-7"
          onClick={handleRecordDeletion}
        >
          Clear Record
        </div>
      </div>
    </Modal>
  );
}

export default CompleteOrderModal;
