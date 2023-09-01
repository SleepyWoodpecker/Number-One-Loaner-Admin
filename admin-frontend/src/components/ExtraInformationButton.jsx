import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import "../index.css";

function ExtraInformationButton({
  showExtraInformation,
  toggleShowInformation,
  formInformation,
}) {
  return (
    <div className="relative">
      <HiOutlineInformationCircle
        strokeWidth={2}
        size={20}
        color="#e8a55f"
        onClick={toggleShowInformation}
      />
      {showExtraInformation && (
        <>
          <div className="z-20 text-bubble text-sm flex justify-center items-center text-center">
            {formInformation}
          </div>
          <div className="z-30 bubble-triangle-outline"></div>
          <div className="z-40 bubble-triangle-inside"></div>
        </>
      )}
    </div>
  );
}

export default ExtraInformationButton;
