import React from "react";
import { LiaSearchSolid } from "react-icons/lia";

function SearchBar({ searchTerm, handleSearchInput }) {
  return (
    <div className="p-1 rounded-xl w-36 flex justify-between items-center border-2">
      <input
        value={searchTerm}
        onChange={handleSearchInput}
        style={{ width: "90%" }}
        className="p-1.5 focus-visible:outline-none h-6"
        placeholder="Requester"
      ></input>
      <LiaSearchSolid size={20} />
    </div>
  );
}

export default SearchBar;
