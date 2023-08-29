import axios from "axios";
const storeBaseUrl = "/api/store";
const requestBaseUrl = "/api/request";

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

const deleteRequest = async (requestId) => {
  const { data: deletedRequest } = await axios.delete(
    `${requestBaseUrl}/${requestId}`
  );
  return deletedRequest;
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
};
