import React, { useState, useEffect, createContext } from "react";
import RequestsPage from "./pages/RequestsPage";
import { getFilteredRequests, getStoreItems } from "./services";
import StoreItemsPage from "./pages/StoreItemsPage";
import { RiNewspaperLine } from "react-icons/ri";
import { PiWarehouseDuotone } from "react-icons/pi";
import { compareDates } from "./Functions";
import TopBar from "./components/TopBar";

// I am gonig to define the NAV BAR here
const RequestContext = createContext(null);

function App() {
  const [activePage, setActivePage] = useState("Store Items");
  const [sizingRequests, setSizingRequests] = useState(null);
  const [sizingAppointments, setSizingAppointments] = useState(null);
  const [returnAppointments, setReturnAppointments] = useState(null);
  const [completeReturns, setCompleteReturns] = useState(null);
  const [storeItems, setStoreItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storeItems = async () => {
      const [
        { sizingReq, sizingAppt, returnAppt, completeRtn },
        storeItemList,
      ] = await Promise.all([getFilteredRequests(), getStoreItems()]);
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
      setStoreItems(storeItemList);
    };
    storeItems();
  }, []);

  let displayedPage;

  if (activePage === "Requests") {
    displayedPage = (
      <RequestsPage storeItems={storeItems} setStoreItems={setStoreItems} />
    );
  } else if (activePage === "Store Items") {
    displayedPage = (
      <StoreItemsPage storeItems={storeItems} setStoreItems={setStoreItems} />
    );
  }

  const handleRequestsClick = () => {
    setActivePage("Requests");
  };

  const handleStoreHouseClick = () => {
    setActivePage("Store Items");
  };

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
      }}
    >
      <div className="p-4 pt-7 mb-6 mt-8" style={{ height: "92vh" }}>
        <TopBar />
        {message}
        {displayedPage}
        <div
          className="bg-orange-200 fixed bottom-0 left-0 right-0 p-2"
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
          </ul>
        </div>
        {/* dummy component to load the yellow coloring into tailwind */}
        <div className="h-0 w-0 bg-yellow-100"></div>
        <div className="h-0 w-0 bg-green-100"></div>
        <div className="h-0 w-0 bg-red-100"></div>
      </div>
    </RequestContext.Provider>
  );
}

export default App;
export { RequestContext };
