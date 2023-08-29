import React, { useState } from "react";

function CustomInput({
  desiredValue,
  input,
  setInput,
  width,
  isEmail = false,
  isDate = false,
  isTime = false,
  isPassword = false,
  isForm = false,
}) {
  const handleInputChange = (e) => setInput(e.target.value);
  const [showPassword, setShowPassword] = useState(false);

  let inputType = "text";

  if (isEmail) {
    inputType = "email";
  } else if (isDate) {
    inputType = "Date";
  } else if (isTime) {
    inputType = "time";
  } else if (isPassword) {
    inputType = showPassword ? "text" : "password";
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-start w-full">
      {desiredValue && (
        <label
          htmlFor={desiredValue}
          className=" text-base"
        >{`${desiredValue}`}</label>
      )}
      <input
        id={desiredValue}
        value={input}
        onChange={handleInputChange}
        type={inputType}
        className={`focus-visible:outline-orange-500 border-2 px-1 py-0.5 justify-self-end rounded-md w-${width} ${
          isForm ? "" : "text-center"
        }`}
        autoComplete="on"
        autoFocus="on"
      ></input>
      {isPassword && (
        <div className="flex flex-start items-center mx-0.5 mt-3">
          <input
            type="checkbox"
            onClick={togglePasswordVisibility}
            className="mr-3"
            id="showpw"
          ></input>
          <label htmlFor="showpw" className="text-sm">
            Show password
          </label>
        </div>
      )}
    </div>
  );
}

export default CustomInput;
