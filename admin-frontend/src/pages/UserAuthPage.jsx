import React, { useState, useContext, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { loginUser, checkUserLogin } from "../services";
import { showFeedbackMessage } from "../Functions";
import { RequestContext } from "../App";

function UserAuthPage({ changeActivePage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { setMessage } = useContext(RequestContext);

  // check if the user is already logged in by checking his local storage. Else, prompt him to log in
  useEffect(() => {
    const checkLogin = async () => {
      const loginData = await checkUserLogin();
      setUser(loginData);
    };
    checkLogin();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
    setUser(user);
  };

  let displayPage;

  if (!user) {
    displayPage = <p>LOADING...</p>;
  } else if (user.error) {
    displayPage = (
      <form className="w-full" onSubmit={handleUserLogin}>
        <div className="m-10"></div>
        <CustomInput
          desiredValue={"Username"}
          input={username}
          handleInputChange={handleUsernameChange}
          width="full"
          isForm
        />
        <div className="m-6"></div>
        <CustomInput
          desiredValue={"Password"}
          input={password}
          handleInputChange={handlePasswordChange}
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
  } else if (user.ok) {
    displayPage = (
      <div className="flex flex-col justify-evenly items-center">
        <h2 className="text-xl font-semibold mt-5 text-center">
          Logged in as {user.username}
        </h2>
        <p className="mt-3 flex justify-center w-48 items-center text-center">
          You now have the rights to delete completed requests and adjust the
          quantity of store items
        </p>
        <div className="flex flex-col justify-center items-center mt-8">
          <div
            className="w-60 bg-orange-200 rounded-md p-1 text-center"
            onClick={() => changeActivePage("Add Store")}
          >
            Add Items To Store
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <div
            className="w-60 bg-orange-200 rounded-md p-1 text-center"
            onClick={() => changeActivePage("Store Items")}
          >
            Edit Store Items
          </div>
        </div>
      </div>
    );
  }

  return <div>{displayPage}</div>;
}

export default UserAuthPage;
