import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { loginUser } from "../services";
import { showFeedbackMessage } from "../Functions";
import { RequestContext } from "../App";

function UserAuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setMessage } = useContext(RequestContext);

  const handleUserLogin = async () => {
    const user = await loginUser(username, password);
    setUsername("");
    setPassword("");
    if (user.error) {
      showFeedbackMessage(user.error, "red", setMessage, 3500);
      return;
    }
    // else save the user to local storage
    showFeedbackMessage(`Login successful`, "green", setMessage, 3500);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  return (
    <form className="w-full">
      <div className="m-10"></div>
      <CustomInput
        desiredValue={"Username"}
        input={username}
        setInput={setUsername}
        width="full"
        isForm
      />
      <div className="m-6"></div>
      <CustomInput
        desiredValue={"Password"}
        input={password}
        setInput={setPassword}
        width="full"
        isPassword
        isForm
      />
      <div className="flex justify-center items-center">
        <div
          className="rounded-md bg-orange-200 p-3 mt-12 w-48 text-center"
          onClick={handleUserLogin}
        >
          Login
        </div>
      </div>
    </form>
  );
}

export default UserAuthPage;
