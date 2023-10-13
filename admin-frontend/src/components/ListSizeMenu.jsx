import React, { useContext, useState } from "react";
import CustomInput from "./CustomInput";
import { BsCheck2 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  checkEmptyObject,
  showFeedbackMessage,
  validateQuantity,
} from "../Functions";
import { RequestContext } from "../pages/MainPage";

function ListSizeMenu({ data, setData }) {
  const { setMessage } = useContext(RequestContext);
  const [newVariation, setNewVariation] = useState({ size: "", quantity: "" });

  const formValidation = () => {
    // ensure that both fields are filled
    if (!checkEmptyObject(newVariation)) {
      showFeedbackMessage(
        `Ensure that both fields are filled before adding a size / variation`,
        "yellow",
        setMessage,
        3500
      );
      return false;
    }
    // check that the variations are not repeated
    for (const item of data) {
      if (item.size === newVariation.size.replace(" ", "")) {
        showFeedbackMessage(
          `There can only be one entry for each size / variation`,
          "red",
          setMessage,
          3500
        );
        return false;
      }
    }
    // ensure that the quantity is a number
    if (!validateQuantity(newVariation.quantity)) {
      showFeedbackMessage(
        `Quantity should be a number`,
        "red",
        setMessage,
        3500
      );
      return false;
    }

    return true;
  };

  const addNewVariation = () => {
    if (!formValidation()) return;
    const newSizes = data.concat(newVariation);
    setData((data) => ({ ...data, sizes: newSizes }));
    setNewVariation({ size: "", quantity: "" });
  };

  const removeVariation = (entry) => {
    // in this example, size is the unique variable
    const newSizes = data.filter((item) => item.size !== entry.size);
    setData((data) => ({ ...data, sizes: newSizes }));
  };

  const displayRows = data.map((entry) => {
    return (
      <div
        className="w-full flex justify-center items-center mt-1.5 relative"
        key={entry.size}
      >
        <div className="w-full flex justify-center items-center">
          <p className="w-32 text-center">{entry.size}</p>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="w-32 text-center">{entry.quantity}</p>
        </div>
        <div className="absolute right-0">
          <RiDeleteBin6Line size={15} onClick={() => removeVariation(entry)} />
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <p className="w-32 text-center">Size / Variation</p>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="w-32 text-center">Quantity</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-1">
        {displayRows}
      </div>
      <div className="flex justify-center items-center relative mt-1">
        <CustomInput
          width="20"
          divAlignment="center"
          input={newVariation.size}
          handleInputChange={(e) =>
            setNewVariation((newVariation) => ({
              ...newVariation,
              size: e.target.value,
            }))
          }
        />
        <CustomInput
          width="20"
          divAlignment="center"
          input={newVariation.quantity}
          handleInputChange={(e) =>
            setNewVariation((newVariation) => ({
              ...newVariation,
              quantity: e.target.value.replace(" ", ""),
            }))
          }
        />
        <div className="absolute right-0">
          <BsCheck2 size={15} onClick={addNewVariation} />
        </div>
      </div>

      <div className="w-20 h-0"></div>
    </div>
  );
}

export default ListSizeMenu;
