import axios from "axios";
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
};
