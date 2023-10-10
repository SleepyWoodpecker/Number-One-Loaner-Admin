import React, { useContext } from "react";
import EmbeddedCalendar from "../components/EmbeddedCalendar";
import Carousell from "../components/Carousell";
import { RequestContext } from "../pages/MainPage";
import RequestTab from "../components/RequestTab";

function RequestsPage({ storeItems, setStoreItems }) {
  const {
    sizingRequests,
    setSizingRequests,
    sizingAppointments,
    setSizingAppointments,
    returnAppointments,
    setReturnAppointments,
    completeReturns,
    setCompleteReturns,
  } = useContext(RequestContext);

  const carousellItems = [
    {
      id: "SizingRequests",
      tab: (
        <RequestTab
          requests={sizingRequests}
          setRequests={setSizingRequests}
          type="Sizing Requests"
          title="Requests"
          storeItems={storeItems}
          setStoreItems={setStoreItems}
        />
      ),
    },
    {
      id: "SizingAppointments",
      tab: (
        <RequestTab
          requests={sizingAppointments}
          setRequests={setSizingAppointments}
          type="Sizing Appointments"
          title="Sizing Appointments"
          storeItems={storeItems}
          setStoreItems={setStoreItems}
        />
      ),
    },
    {
      id: "Return Appointments",
      tab: (
        <RequestTab
          requests={returnAppointments}
          setRequests={setReturnAppointments}
          type="Return Appointments"
          title="Upcoming Returns"
          storeItems={storeItems}
          setStoreItems={setStoreItems}
        />
      ),
    },
    {
      id: "Completed Returns",
      tab: (
        <RequestTab
          requests={completeReturns}
          setRequests={setCompleteReturns}
          type="Return Archive"
          title="Completed Returns"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <EmbeddedCalendar />
      <Carousell carousellItems={carousellItems} />
    </div>
  );
}

export default RequestsPage;
