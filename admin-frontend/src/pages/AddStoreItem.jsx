import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

function AddStoreItemPage({ changeActivePage }) {
  // need perform user verification first
  const [storeItemInformation, setStoreItemInformation] = useState({
    itemName: "",
    itemQuantity: "",
    sizes: "",
  });

  const uploadFile = () => {
    document.querySelector("#storeItemImage").click();
  };
  const handleStoreItemInput = (e, field) => {
    let input = e.target.value;
    if (field === "itemQuantity") {
      input = Number(input);
    }
    setStoreItemInformation((storeItemInformation) => ({
      ...storeItemInformation,
      [field]: input,
    }));
  };
  // must remember to take into account that the values can be separated by ", " as well
  const sizeInformation = `Enter the sizes or varitions available as comma separated values e.g. 5,6,7,8,9`;

  return (
    <>
      <IoIosArrowRoundBack
        size={30}
        color="#909191"
        className="absolute top-13"
        onClick={() => changeActivePage("Auth")}
      />
      <h2 className="text-xl font-bold text-center">Add Item To Store</h2>
      <div className="flex flex-col justify-evenly h-4/6">
        {/* this then has to make an api call to imgbb on success, to upload the image */}
        <div>
          <label htmlFor="image">Image</label>
          <div
            onClick={uploadFile}
            className="flex justify-center items-center border-2 rounded-md py-3"
            id="image"
          >
            <RiImageAddLine size={70} strokeWidth={0.1} color="#909191" />
          </div>
        </div>
        {/* accept field causes it to only acccept images */}
        <input
          type="file"
          id="storeItemImage"
          className="hidden"
          accept="image/*"
        />
        <CustomInput
          desiredValue="Name"
          input={storeItemInformation.itemName}
          width="full"
          handleInputChange={(e) => handleStoreItemInput(e, "itemName")}
          isForm
        />
        <CustomInput
          desiredValue="Quantity"
          input={storeItemInformation.itemQuantity}
          width="full"
          handleInputChange={(e) => handleStoreItemInput(e, "itemQuantity")}
          isForm
        />
        {/* this one probably needs a button to explain how it works, but it should be a CSV of the sizes */}
        <CustomInput
          desiredValue="Sizes / Variations"
          input={storeItemInformation.sizes}
          width="full"
          handleInputChange={(e) => handleStoreItemInput(e, "sizes")}
          formInformation={sizeInformation}
          isForm
        />
      </div>
    </>
  );
}

export default AddStoreItemPage;
