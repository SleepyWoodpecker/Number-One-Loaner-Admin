import axios from "axios";
import { validateQuantity } from "./Functions";
const storeBaseUrl = "/api/store";
const requestBaseUrl = "/api/request";
const userBaseUrl = "/api/user/login";

const getStoreItems = async () => {
  const { data: storeItems } = await axios.get(storeBaseUrl);
  return storeItems;
};

const getRequests = async () => {
  const { data: requests } = await axios.get(requestBaseUrl);
  return requests;
};

const getFilteredRequests = async () => {
  const { data: filteredRequests } = await axios.get(
    `${requestBaseUrl}/filteredRequests`
  );
  return filteredRequests;
};

const updateRequest = async (requestId, newRequest) => {
  const { data: updatedRequest } = await axios.put(
    `${requestBaseUrl}/${requestId}`,
    newRequest
  );
  return updatedRequest;
};

const addNewCalendarEvent = async (
  requestingUnit,
  startTime,
  endTime,
  guestEmail
) => {
  await axios.post(`/api/calendar`, {
    requestingUnit,
    startTime,
    endTime,
    guestEmail,
  });
  return { ok: "true" };
};

const updateStoreItemsPostRequest = async (request) => {
  // request is the entire request Obj
  const { data: updatedStoreItems } = await axios.put(
    `${storeBaseUrl}/post-request/downstock`,
    request
  );
  return updatedStoreItems;
};

const updateStoreItemsPostSizing = async (request) => {
  const { data: updatedStoreItems } = await axios.put(
    `${storeBaseUrl}/post-sizing/downstock`,
    request
  );
  return updatedStoreItems;
};

const updateStoreItemsPostReturn = async (request) => {
  const { data: updatedStoreItems } = await axios.put(
    `${storeBaseUrl}/post-return/upstock`,
    request
  );
  return updatedStoreItems;
};

const deleteRequest = async (requestId, userData) => {
  if (!userData) {
    return { error: "Not logged in" };
  }
  try {
    const { data: deletedRequest } = await axios.delete(
      `${requestBaseUrl}/${requestId}`,
      { headers: { Authorization: `bearer ${userData.token}` } }
    );
    return deletedRequest;
  } catch (err) {
    // the other error should be that token is expired
    if (err.response.data.error === "TokenExpiredError") {
      return { error: "Please log in again" };
    }
  }
};

const loginUser = async (username, password) => {
  try {
    const { data: encodedUser } = await axios.post(`${userBaseUrl}`, {
      username,
      password,
    });
    return encodedUser;
  } catch (err) {
    return err.response.data;
  }
};

// still incomplete
const addNewStoreItem = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData.image);
  formData.append("key", process.env.REACT_APP_IMGBB_API_KEY);
  formData.append("name", imageData.itemName);
  const imageUpload = await axios.post(
    `https://api.imgbb.com/1/upload`,
    formData
  );
  console.log(imageUpload);
  const imgUrl = imageUpload.data.data.display_url;
  const initialQuantity =
    imageData.hasSize === "Yes"
      ? imageData.sizes.reduce((acc, size) => acc + Number(size.quantity), 0)
      : imageData.itemQuantity;
  const mainItemData = {
    name: imageData.itemName,
    quantity: initialQuantity,
    imgUrl,
    originalQuantity: initialQuantity,
    sizes: imageData.sizes.map((item) => item.size),
  };

  const { data: uploadedMainItemData } = await axios.post(
    storeBaseUrl,
    mainItemData
  );
  let variationRequest;
  if (imageData.hasSize === "Yes") {
    // if there are sizes, add a new entry in the DB for each size
    variationRequest = imageData.sizes.map((variation) => {
      const data = {
        name: `${imageData.itemName} - (${
          validateQuantity(variation.size) ? `Size` : ""
        } ${variation.size})`,
        quantity: variation.quantity,
        originalQuantity: variation.quantity,
        imgUrl,
        consolidatedItemId: uploadedMainItemData.id,
      };
      return axios.post(storeBaseUrl, data);
    });

    const [item1, item2] = await Promise.all(variationRequest);
    console.log(item1, item2);
  }

  return uploadedMainItemData;
};

const findAllVariations = async (mainItemId) => {
  const { data: allVariations } = await axios.get(
    `${storeBaseUrl}/findAllVariations/${mainItemId}`
  );
  return allVariations;
};

const findAllAssociatedRequests = async (hasSize, mainItemId) => {
  const { data: associatedRequests } = await axios.get(
    `${requestBaseUrl}/findAllAssociatedRequests/${
      hasSize ? "variations" : "main"
    }/${mainItemId}`
  );
  return associatedRequests;
};

export {
  getStoreItems,
  getRequests,
  getFilteredRequests,
  updateRequest,
  addNewCalendarEvent,
  updateStoreItemsPostRequest,
  updateStoreItemsPostSizing,
  updateStoreItemsPostReturn,
  deleteRequest,
  loginUser,
  addNewStoreItem,
  findAllVariations,
  findAllAssociatedRequests,
};
