import axios from "axios";
import { validateSizeQuantity } from "./Functions";
const storeBaseUrl = "/api/store";
const requestBaseUrl = "/api/request";
const userBaseUrl = "/api/user";

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
  console.log(userData);
  const { data: deletedRequest } = await axios.delete(
    `${requestBaseUrl}/${requestId}`,
    { headers: { Authorization: `bearer ${userData.token}` } }
  );
  return deletedRequest;
};

const loginUser = async (username, password) => {
  try {
    const { data: encodedUser } = await axios.post(`${userBaseUrl}/login`, {
      username,
      password,
    });
    return encodedUser;
  } catch (err) {
    return err.response.data;
  }
};

// still incomplete
const addNewStoreItem = async (itemData) => {
  const formData = new FormData();
  formData.append("image", itemData.image);
  formData.append("key", process.env.REACT_APP_IMGBB_API_KEY);
  formData.append("name", itemData.itemName);
  const imageUpload = await axios.post(
    `https://api.imgbb.com/1/upload`,
    formData
  );
  const imgUrl = imageUpload.data.data.display_url;
  // const initialQuantity =
  //   itemData.hasSize === "Yes"
  //     ? itemData.sizes.reduce((acc, size) => acc + Number(size.quantity), 0)
  //     : itemData.itemQuantity;
  const mainItemData = {
    name: itemData.itemName,
    quantity: itemData.itemQuantity,
    imgUrl,
    originalQuantity: itemData.itemQuantity,
    sizes: itemData.sizes.map((item) => item.size),
    category: itemData.category,
  };

  const { data: uploadedMainItemData } = await axios.post(
    storeBaseUrl,
    mainItemData
  );
  let variationRequest;
  if (itemData.hasSize === "Yes") {
    // if there are sizes, add a new entry in the DB for each size
    variationRequest = itemData.sizes.map((variation) => {
      const data = {
        name: `${itemData.itemName} - (${
          validateSizeQuantity(variation.size) ? `Size` : ""
        }${variation.size})`,
        quantity: variation.quantity,
        originalQuantity: variation.quantity,
        imgUrl,
        consolidatedItemId: uploadedMainItemData.id,
        category: itemData.category,
      };
      return axios.post(storeBaseUrl, data);
    });

    await Promise.all(variationRequest);
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

async function checkUserLogin() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const { data: userLogin } = await axios.post(`${userBaseUrl}/verify`, user);
  return userLogin;
}

async function adjustStoreQuantity(updatedItem) {
  const { data: modifiedItem } = await axios.put(
    `${storeBaseUrl}/adjustStoreQuantity`,
    updatedItem
  );
  return modifiedItem;
}

async function deleteStoreItem(id) {
  const { data: deletedItem } = await axios.delete(`${storeBaseUrl}/${id}`);
  return deletedItem;
}

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
  checkUserLogin,
  adjustStoreQuantity,
  deleteStoreItem,
};
