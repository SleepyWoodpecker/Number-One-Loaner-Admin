import React from "react";
import "../index.css";

function TopBar() {
  return (
    <div className="w-full bg-orange-200 h-12 fixed top-0 left-0 right-0 flex justify-between items-center z-20 shadow-md">
      <img
        src={require("../Images/Name.PNG")}
        className="w-64 ml-1"
        alt="Name"
      />
      <img
        src={require("../Images/Logo.PNG")}
        className="h-11 w-11 mr-1"
        alt="logo"
      />
    </div>
  );
}

export default TopBar;
