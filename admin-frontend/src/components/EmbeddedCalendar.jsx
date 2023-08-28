import React, { useEffect, useState } from "react";

function EmbeddedCalendar() {
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    const calendar = document.querySelector("#embedded-calendar");
    calendar.addEventListener("load", () => {
      setCalendarLoaded(true);
    });
    return () => {
      calendar.removeEventListener("load", () => setCalendarLoaded(true));
    };
  });

  return (
    <div>
      {/* this seems like an easy solution, but looks kind of bad... */}
      <iframe
        src="https://calendar.google.com/calendar/embed?height=330&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FSingapore&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=Njc1MDQ4ZWIzYTg5YmNhMmMzZjQxOGEwZWQ1MzE1NTc0Y2U3MThlYzM2YjFiM2Q3NzA4NzEyZTVhZjc1NTE1NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2Iuc2luZ2Fwb3JlI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23F6BF26&color=%230B8043"
        style={{
          height: calendarLoaded ? 310 : 0,
          width: calendarLoaded ? 310 : 0,
        }}
        className="mx-auto"
        title="Schedule"
        id="embedded-calendar"
      ></iframe>

      {calendarLoaded || (
        <div
          style={{
            height: calendarLoaded ? 0 : 310,
            width: calendarLoaded ? 0 : 310,
          }}
          className="mx-auto p-3"
        >
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}

export default EmbeddedCalendar;
