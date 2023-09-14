import React from "react";
import Modal from "./Modal";

function GeneralModal({ request, closeModal }) {
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
    </Modal>
  );
}

export default GeneralModal;
