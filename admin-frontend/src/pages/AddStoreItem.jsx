import React, { useContext, useState } from "react";
import CustomInput from "../components/CustomInput";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
import { addNewStoreItem } from "../services";
import DropdownMenu from "../components/DropdownMenu";
import ListSizeMenu from "../components/ListSizeMenu";
import {
  capitaliseFirstLetter,
  checkEmptyObject,
  showFeedbackMessage,
  validateQuantity,
} from "../Functions";
import { RequestContext } from "../pages/MainPage";
import { useNavigate } from "react-router-dom";

function AddStoreItemPage({ changeActivePage, categories }) {
  const { setMessage, setStoreItems } = useContext(RequestContext);
  // need perform user verification first
  const [storeItemInformation, setStoreItemInformation] = useState({
    itemName: "",
    itemQuantity: "",
    hasSize: false,
    sizes: [],
    image: null,
    preview: null,
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempCategory, setTempCategory] = useState("");
  const navigate = useNavigate();
  const uploadFile = () => {
    document.querySelector("#storeItemImage").click();
  };
  const handleStoreItemInput = (e, field) => {
    let input = e.target.value;
    setStoreItemInformation((storeItemInformation) => ({
      ...storeItemInformation,
      [field]: input,
    }));
  };

  const handleImageUpload = (e) => {
    let imageData = e.target.files[0];
    if (!imageData) return;
    setStoreItemInformation((storeItemInformation) => ({
      ...storeItemInformation,
      preview: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    const storeEntry = {
      ...storeItemInformation,
      category: storeItemInformation.category.toLowerCase(),
    };

    if (storeItemInformation.hasSize === "Yes") {
      const totalQuantity = storeItemInformation.sizes.reduce(
        (acc, size) => acc + Number(size.quantity),
        0
      );
      storeEntry.itemQuantity = totalQuantity;
    }

    if (!checkEmptyObject(storeEntry)) {
      showFeedbackMessage(`All fields must be filled`, "red", setMessage, 4000);
      return;
    }

    if (!validateQuantity(storeItemInformation.itemQuantity)) {
      showFeedbackMessage(`Quantity must be a number`, "red", setMessage, 4000);
      return;
    }
    setIsSubmitting(true);
    // fix casing for the store items
    const newItem = await addNewStoreItem(storeEntry);
    setStoreItems((storeItems) => ({
      ...storeItems,
      items: [...storeItems.items, newItem],
    }));
    showFeedbackMessage(
      `${newItem.name} added to the store list`,
      "green",
      setMessage,
      3500
    );
    setStoreItemInformation({
      itemName: "",
      itemQuantity: "",
      hasSize: false,
      sizes: [],
      image: null,
      preview: null,
      category: "",
    });
    setIsSubmitting(false);
    setTempCategory("");
    return navigate(`/store/${newItem.id}`);
  };

  const displayCategories = [...categories, "new category"].map((category) =>
    capitaliseFirstLetter(category)
  );
  const handleIsNewCategoryInput = (e) => {
    const input = e.target.value;
    if (
      categories.find(
        (category) => category.toLowerCase() === input.toLowerCase()
      )
    ) {
      setStoreItemInformation((storeItemInformation) => ({
        ...storeItemInformation,
        category: input,
      }));
    } else {
      setStoreItemInformation((storeItemInformation) => ({
        ...storeItemInformation,
        category: "",
      }));
    }
    setTempCategory(e.target.value);
  };

  const formMargin = "mt-2";
  const sizeInformationOptions = ["Yes", "No"];

  let conditionalField = "";
  if (storeItemInformation.hasSize === "Yes") {
    conditionalField = (
      <ListSizeMenu
        data={storeItemInformation.sizes}
        setData={setStoreItemInformation}
      />
    );
  } else if (storeItemInformation.hasSize === "No") {
    conditionalField = (
      <CustomInput
        desiredValue="Quantity"
        input={storeItemInformation.itemQuantity}
        width="full"
        handleInputChange={(e) => handleStoreItemInput(e, "itemQuantity")}
        isForm
      />
    );
  }

  return (
    <>
      <IoIosArrowRoundBack
        size={30}
        color="#909191"
        className="absolute top-13"
        onClick={() => changeActivePage("Auth")}
      />
      <h2 className="text-xl font-bold text-center mb-3">Add Item To Store</h2>
      <form
        className="flex flex-col overflow-y-scroll"
        style={{ height: "90%" }}
      >
        {/* this then has to make an api call to imgbb on success, to upload the image */}
        <div>
          <label htmlFor="image">Image</label>
          <div
            onClick={uploadFile}
            className="flex flex-col justify-center items-center border-2 rounded-md py-3"
            id="image"
          >
            {storeItemInformation.image ? (
              <img
                src={storeItemInformation.preview}
                alt="Preview"
                style={{ height: 120, width: 120 }}
                className="rounded-md mb-2"
              />
            ) : (
              <RiImageAddLine size={70} strokeWidth={0.1} color="#909191" />
            )}
            <p className="text-xs">
              {storeItemInformation.image && storeItemInformation.image.name}
            </p>
          </div>
        </div>
        <input
          type="file"
          id="storeItemImage"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          autoFocus="on"
        />
        <div className={`${formMargin}`}>
          <CustomInput
            desiredValue="Name"
            input={storeItemInformation.itemName}
            width="full"
            handleInputChange={(e) => handleStoreItemInput(e, "itemName")}
            isForm
          />
        </div>

        <div className={`${formMargin}`}>
          <DropdownMenu
            input={tempCategory}
            desiredValue="Category"
            handleInputChange={handleIsNewCategoryInput}
            options={displayCategories}
          />
        </div>
        {tempCategory === "New category" && (
          <div className={`${formMargin}`}>
            <CustomInput
              desiredValue="New Category"
              input={storeItemInformation.category}
              width="full"
              handleInputChange={(e) => handleStoreItemInput(e, "category")}
              isForm
            />
          </div>
        )}
        <div className={`${formMargin}`}>
          <DropdownMenu
            input={storeItemInformation.hasSize}
            desiredValue="Sizes / Variations"
            handleInputChange={(e) => handleStoreItemInput(e, "hasSize")}
            options={sizeInformationOptions}
          />
        </div>
        {/* if there are sizes, add the boxes that allow you to input them */}
        <div className={`mt-2`}>{conditionalField}</div>
        <div className="flex justify-center items-center">
          <div
            className="rounded-md bg-orange-200 px-3 py-2 mt-6 w-full text-center h-10"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <img
                src={require("../Images/Loading.gif")}
                alt="loading animation"
                className="mx-auto h-full"
              />
            ) : (
              <p className="text-lg">Add item</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddStoreItemPage;
