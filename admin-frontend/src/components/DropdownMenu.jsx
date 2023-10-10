import React from "react";

function DropdownMenu({ input, handleInputChange, options, desiredValue }) {
  return (
    <>
      <label htmlFor={desiredValue}>{desiredValue}</label>
      <select
        className="focus-visible:outline-orange-500 border-2 px-1.5 py-1 justify-self-end w-full rounded-md w-full"
        value={input}
        onChange={handleInputChange}
        id={desiredValue}
      >
        <option value=""></option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropdownMenu;
