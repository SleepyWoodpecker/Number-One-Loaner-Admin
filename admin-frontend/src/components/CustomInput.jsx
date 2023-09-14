import React, { useState } from "react";
import ExtraInformationButton from "./ExtraInformationButton";

function CustomInput({
  desiredValue,
  divAlignment = "start",
  input,
  width,
  handleInputChange,
  isEmail = false,
  isDate = false,
  isTime = false,
  isPassword = false,
  isForm = false,
  formInformation = "",
  autoFocus = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showExtraInformation, setShowExtraInformation] = useState(false);

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

  const toggleShowInformation = () => {
    setShowExtraInformation((showExtraInformation) => !showExtraInformation);
  };

  const showInfo = () => {
    setShowExtraInformation(true);
  };

  const hideInfo = () => {
    setShowExtraInformation(false);
  };

  const returnFn = () => {
    return;
  };

  const handleFormInput = (e) => {
    // if this form is a field that needs to display extra information, hide / show the speech bubble
    const input = e.target.value;
    if (formInformation) {
      if (input === "") {
        showInfo();
      } else {
        hideInfo();
      }
    }
    handleInputChange(e);
  };

  return (
    <div className={`flex flex-col items-${divAlignment} w-full`}>
      <div className="flex justify-between">
        {desiredValue && (
          <label
            htmlFor={desiredValue}
            className=" text-base"
          >{`${desiredValue}`}</label>
        )}
        <div className="flex justify-center items-center mt-0.5 ml-1">
          {formInformation && (
            <ExtraInformationButton
              showExtraInformation={showExtraInformation}
              toggleShowInformation={toggleShowInformation}
              formInformation={formInformation}
            />
          )}
        </div>
      </div>
      <input
        id={desiredValue}
        value={input}
        onChange={handleFormInput}
        type={inputType}
        className={`focus-visible:outline-orange-400 border-2 px-1 py-0.5 justify-self-end rounded-md w-${width} ${
          isForm ? "" : "text-center"
        }`}
        onFocus={formInformation ? showInfo : returnFn}
        onBlur={formInformation ? hideInfo : returnFn}
        autoComplete={isEmail ? "on" : "off"}
        autoFocus={autoFocus}
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
