import React, { useState } from "react";
import RequestDetailModal from "./RequestDetailModal";
import LoanProcessModal from "./LoanProcessModal";
import LoanReturnModal from "./LoanReturnModal";
import CompleteOrderModal from "./CompleteOrderModal";
import GeneralModal from "./GeneralModal";

function RecordItem({
  request,
  requestList,
  setRequestList,
  type,
  storeItems,
  setStoreItems,
}) {
  const [showModal, setShowModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState(request.status);
  // somehow cannot get this to refresh because status cannot update in time for the render
  let color;

  if (requestStatus === "Pending" || requestStatus === "Awaiting Return") {
    color = "yellow";
  } else if (
    requestStatus === "Awaiting Sizing" ||
    requestStatus === "Return Complete"
  ) {
    color = "green";
  } else if (
    requestStatus === "Rejected" ||
    requestStatus === "Incomplete Return"
  ) {
    color = "red";
  }

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  // if you wish for value to be dynamic, it should be a state

  let modal;

  if (type === "Sizing Requests") {
    modal = (
      <RequestDetailModal
        request={request}
        closeModal={closeModal}
        setRequestList={setRequestList}
        setRequestStatus={setRequestStatus}
        storeItems={storeItems}
        setStoreItems={setStoreItems}
      />
    );
  } else if (type === "Sizing Appointments") {
    modal = (
      <LoanProcessModal
        request={request}
        setRequestList={setRequestList}
        closeModal={closeModal}
        storeItems={storeItems}
        setStoreItems={setStoreItems}
      />
    );
  } else if (type === "Return Appointments") {
    // change the modal to become a loan return modal
    modal = (
      <LoanReturnModal
        request={request}
        requestList={requestList}
        setRequestList={setRequestList}
        closeModal={closeModal}
        storeItems={storeItems}
        setStoreItems={setStoreItems}
        setRequestStatus={setRequestStatus}
      />
    );
  } else if (type === "Return Archive") {
    modal = (
      <CompleteOrderModal
        request={request}
        setRequestList={setRequestList}
        closeModal={closeModal}
      />
    );
  } else if (type === "Item Tracking") {
    modal = <GeneralModal request={request} closeModal={closeModal} />;
  }
  console.log(modal, type);
  return (
    <div>
      <div
        className="rounded-md shadow-md py-3 px-1 my-2 flex justify-between border-2 border-gray-100 w-full"
        onClick={openModal}
      >
        <h2
          className={`font-semibold mx-2 w-24 overflow-hidden text-sm flex justify-${
            request.requester.length > 14 ? "start" : "center"
          } my-auto`}
          style={{ overflowWrap: "break-word" }}
        >
          {request.requester}
        </h2>
        <p
          className={`mr-1 ${
            type === "Item Tracking" ? "text-sm" : ""
          } my-auto`}
          style={{ overflowWrap: "break-word" }}
        >
          {type === "Return Appointments"
            ? request.returnDate
            : request.sizingDate}
        </p>
        <div
          className={`bg-${color}-200 text-center rounded-md flex items-center justify-center ${
            type === "Item Tracking" ? "text-xs" : "text-sm"
          } mx-2 px-3`}
          style={{ width: "6.5rem" }}
        >
          {requestStatus}
        </div>
      </div>
      {showModal && modal}
    </div>
  );
}

export default RecordItem;
