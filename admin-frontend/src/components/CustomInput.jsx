import React from "react";

function CustomInput({
  desiredValue,
  input,
  setInput,
  isEmail = false,
  isDate = false,
  isTime = false,
}) {
  const handleInputChange = (e) => setInput(e.target.value);

  let inputType = "text";

  if (isEmail) {
    inputType = "email";
  } else if (isDate) {
    inputType = "Date";
  } else if (isTime) {
    inputType = "time";
  }

  return (
    <div className="flex flex-col items-start w-full">
      {desiredValue && (
        <label
          htmlFor={desiredValue}
          className="ml-1 text-base"
        >{`${desiredValue}`}</label>
      )}
      <input
        id={desiredValue}
        value={input}
        onChange={handleInputChange}
        type={inputType}
        className="focus-visible:outline-orange-500 border-2 px-1 py-0.5 justify-self-end rounded-md w-10 text-center"
        autoFocus
      ></input>
    </div>
  );
}

export default CustomInput;
