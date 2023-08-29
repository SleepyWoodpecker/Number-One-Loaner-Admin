import React, { useState } from "react";
import RequestDetailModal from "./RequestDetailModal";
import LoanProcessModal from "./LoanProcessModal";
import LoanReturnModal from "./LoanReturnModal";
import CompleteOrderModal from "./CompleteOrderModal";

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
  }

  return (
    <div>
      <div
        className="rounded-md shadow-md py-3 px-1 my-2 flex justify-between border-2 border-gray-100 w-full"
        onClick={openModal}
      >
        <h2 className="font-semibold mx-2 w-36 overflow-hidden text-sm flex justify-start items-center">
          {request.requester}
        </h2>
        <p className="mx-2">
          {type === "Return Appointments"
            ? request.returnDate
            : request.sizingDate}
        </p>
        <div
          className={`bg-${color}-200 w-32 text-center rounded-md flex items-center justify-center text-sm mx-2 px-3`}
        >
          {requestStatus}
        </div>
      </div>
      {showModal && modal}
    </div>
  );
}

export default RecordItem;
