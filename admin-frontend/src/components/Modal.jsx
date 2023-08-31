import React from "react";
import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";

function Modal({ children, handleModalClose }) {
  const modalStyle = `bg-white border-2 z-20 fixed inset-x-7 inset-y-36 p-2`;

  return createPortal(
    <div>
      <div className={modalStyle}>
        <BsX
          size={18}
          color="#686a6e"
          className="absolute right-0.5 top-0.5"
          onClick={handleModalClose}
        />
        {children}
      </div>
      <div
        className="h-full w-full fixed inset-0 bg-gray-500 opacity-50 fixed z-10"
        onClick={handleModalClose}
      ></div>
    </div>,
    document.getElementById("modal")
  );
}

export default Modal;
