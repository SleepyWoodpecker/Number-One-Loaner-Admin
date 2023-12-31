import React, { useState, useEffect, createContext } from "react";
import RequestsPage from "../pages/RequestsPage";
import { getFilteredRequests } from "../services";
import StoreItemsPage from "../pages/StoreItemsPage";
import { RiNewspaperLine, RiAdminLine } from "react-icons/ri";
import { PiWarehouseDuotone } from "react-icons/pi";
import { compareDates } from "../Functions";
import TopBar from "../components/TopBar";
import UserAuthPage from "../pages/UserAuthPage";
import AddStoreItemPage from "../pages/AddStoreItem";

// I am gonig to define the NAV BAR here
const RequestContext = createContext(null);

function MainPage({ storeItems, setStoreItems }) {
  const [activePage, setActivePage] = useState("Store Items");
  const [sizingRequests, setSizingRequests] = useState(null);
  const [sizingAppointments, setSizingAppointments] = useState(null);
  const [returnAppointments, setReturnAppointments] = useState(null);
  const [completeReturns, setCompleteReturns] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const { sizingReq, sizingAppt, returnAppt, completeRtn } =
        await getFilteredRequests();
      setSizingRequests(
        sizingReq.sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );
      setSizingAppointments(
        sizingAppt.sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );
      setReturnAppointments(
        returnAppt.sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );
      setCompleteReturns(
        completeRtn.sort((a, b) => compareDates(a.sizingDate, b.sizingDate))
      );
    };
    loadData();
  }, []);

  // remove all this
  const handleRequestsClick = () => {
    setActivePage("Requests");
  };

  const handleStoreHouseClick = () => {
    setActivePage("Store Items");
  };

  const handleAuthClick = () => {
    setActivePage("Auth");
  };

  // compile everything into this when refactoring
  const changeActivePage = (pageName) => {
    setActivePage(pageName);
  };

  let displayedPage;

  let categories;
  if (Object.entries(storeItems).length > 0) {
    categories = [
      ...new Set(storeItems.items.map((storeItem) => storeItem.category)),
    ];
  }

  switch (activePage) {
    case "Requests":
      displayedPage = (
        <RequestsPage storeItems={storeItems} setStoreItems={setStoreItems} />
      );
      break;
    case "Store Items":
      displayedPage = (
        <StoreItemsPage storeItems={storeItems} setStoreItems={setStoreItems} />
      );
      break;
    case "Auth":
      displayedPage = <UserAuthPage changeActivePage={changeActivePage} />;
      break;
    case "Add Store":
      displayedPage = (
        <AddStoreItemPage
          changeActivePage={changeActivePage}
          categories={categories}
        />
      );
      break;
    default:
      displayedPage = (
        <StoreItemsPage storeItems={storeItems} setStoreItems={setStoreItems} />
      );
  }

  return (
    <RequestContext.Provider
      value={{
        sizingRequests,
        setSizingRequests,
        sizingAppointments,
        setSizingAppointments,
        returnAppointments,
        setReturnAppointments,
        completeReturns,
        setCompleteReturns,
        setMessage,
        handleAuthClick,
        setStoreItems,
      }}
    >
      <div
        className="p-4 pt-7 mb-6 mt-8  mid-point-2:max-w-md mid-point-2:mx-auto"
        style={{ height: "92vh" }}
      >
        <TopBar />
        {message}
        {displayedPage}
        <div
          className="bg-orange-200 fixed bottom-0 left-0 right-0 pb-2 h-12 "
          style={{
            boxShadow:
              "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        >
          <ul className="flex justify-around p-2 w-full">
            <li>
              <PiWarehouseDuotone
                size={35}
                onClick={handleStoreHouseClick}
                style={{
                  color: activePage === "Store Items" ? "black" : "#bfbdbd",
                }}
              />
            </li>
            <li>
              <RiNewspaperLine
                size={35}
                onClick={handleRequestsClick}
                style={{
                  color: activePage === "Requests" ? "black" : "#bfbdbd",
                }}
              />
            </li>
            <li>
              <RiAdminLine
                size={35}
                onClick={handleAuthClick}
                style={{
                  color: activePage === "Auth" ? "black" : "#bfbdbd",
                }}
              />
            </li>
          </ul>
        </div>
        {/* dummy component to load the yellow coloring into tailwind */}
        <div className="h-0 w-0 bg-yellow-100"></div>
        <div className="h-0 w-0 bg-green-100"></div>
        <div className="h-0 w-0 bg-red-100"></div>
        <div className="h-0 w-0 bg-yellow-200"></div>
        <div className="h-0 w-0 bg-green-200"></div>
        <div className="h-0 w-0 bg-red-200"></div>
      </div>
    </RequestContext.Provider>
  );
}

export default MainPage;
export { RequestContext };
