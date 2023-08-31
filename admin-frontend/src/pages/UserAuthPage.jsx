import React, { useState, useContext, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { loginUser } from "../services";
import { checkUserLogin, showFeedbackMessage } from "../Functions";
import { RequestContext } from "../App";

function UserAuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { setMessage } = useContext(RequestContext);

  // check if the user is already logged in by checking his local storage. Else, prompt him to log in
  useEffect(() => {
    setUser(checkUserLogin());
  }, []);

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

  return user ? (
    // need to improve on this CSS later
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mt-16 text-center">
        Logged in as {user.username}
      </h2>
      <p className="mt-10 flex justify-center w-48 items-center text-center">
        You now have the rights to delete completed requests and adjust the
        quantity of store items
      </p>
    </div>
  ) : (
    <form className="w-full" onSubmit={handleUserLogin}>
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
