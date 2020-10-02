import React, { useState } from "react";
import { loginUser, facbookLogin } from "../firebase/fb-config";
import { useHistory } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  toast.configure();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async () => {
    if (email == "" || password == "") {
      toast.error("Data is not in correct format", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    } else {
      try {
        await setTimeout(() => {
          loginUser(email, password);
          history.push("/home");
        }, 2000);
        toast.success(
          "Wellcome",
          { email },
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          }
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <div className="login-parent-div">
      <div className="login-child-div">
        <h1 id="head1">Login form</h1>
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
          <button className="waves-effect  teal darken-2 btn" onClick={onLogin}>
            Login
          </button>
          <button
            className="waves-effect  teal darken-2 btn"
            onClick={() => history.push("/signup")}
          >
            Sign Up
          </button>
        </div>
        <button onClick={facbookLogin}>Facebook</button>
      </div>
    </div>
  );
};
export default Login;
