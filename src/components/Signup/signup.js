import React, { useState } from "react";
import { registerUser } from "../firebase/fb-config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const history = useHistory();
  const [user, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  toast.configure()

  const onRegister = async () => {
    try {
       await registerUser(email, password,user);

      // console.log("register", data);
      toast.success('Your Account has been created',{
              position: toast.POSITION.TOP_RIGHT,
              autoClose:4000,
              hideProgressBar:true
              })
      history.push("/home");
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message,{
              position: toast.POSITION.TOP_RIGHT,
              autoClose:4000,
              hideProgressBar:true
              })
    }
  };
  return (
    <div className="login-parent-div">
      <div className="login-child-div">
        <h1 id="head1">Signup form</h1>
        <div className="input-field">
          <label htmlFor="uname" id="label">
            Name
          </label>
          <input
            type="text"
            id="uname"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="email" id="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password" id="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button
            className="waves-effect  teal darken-2 btn"
            onClick={onRegister}
          >
            Create an account
          </button>
          <button
            className="waves-effect  teal darken-2 btn"
            onClick={() => history.push("/")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
