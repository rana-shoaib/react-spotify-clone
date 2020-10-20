import React, { useEffect, useState } from "react";
import "./css/Register.css";
import signup from "./handlers/signup";
import login from "./handlers/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { useStateValue } from "./StateProvider";

function Register({ history }) {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [signupErrors, setSignUpErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const cookies = new Cookies();
  const [{}, dispatch] = useStateValue();

  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
  };

  let signupData = {
    name: "",
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
  };

  let loginData = {
    usernameOrEmail: "",
    password: "",
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    var formEl = document.forms.SignupForm;
    var formData = new FormData(formEl);

    for (const [key] of Object.entries(signupData)) {
      signupData[key] = formData.get(key);
    }

    const result = await signup(signupData);
    if (typeof result === "object") {
      if (result.sucess) {
        toast.info("SignUp Sucessfull 😍");

        cookies.set("loginToken", result.loginToken, { path: "/" });
        dispatch({
          type: "LOGIN_STATUS",
          item: true,
        });
        history.push("/");
      } else {
        setSignUpErrors(result.errors);
        toast.error("Resolve the errors to continue");
      }
    } else {
      toast.error("Something went wrong try again later");
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    var formEl = document.forms.loginForm;
    var formData = new FormData(formEl);

    for (const [key] of Object.entries(loginData)) {
      loginData[key] = formData.get(key);
    }
    console.log(loginData);
    const result = await login(loginData);
    if (typeof result == "object") {
      if (result.sucess) {
        toast.info("Login Sucessfull 😍");
        cookies.set("loginToken", result.token, { path: "/" });
        dispatch({
          type: "LOGIN_STATUS",
          item: true,
        });
        history.push("/");
      } else {
        setLoginError(result.error);
        toast.error("Resolve the errors to continue");
      }
    } else {
      toast.error("Something went wrong try again later");
    }
  };
  return (
    <div className="register-main-container">
      <div className="right">
        <img
          src={require("./assets/logo/spotify-icons-logos/logos/O1_RGB/O2_PNG/Spotify_Logo_RGB_White.png")}
        />
      </div>
      <div className="left">
        <div className="button-container">
          <div
            id="activate-signup-form"
            onClick={toggleForms}
            className={showLoginForm ? "" : "active"}
          >
            <p>Sign Up</p>
          </div>
          <span
            id="activate-login-form"
            onClick={toggleForms}
            className={showLoginForm ? "active" : ""}
          >
            <p>Log In</p>{" "}
          </span>
        </div>
        <form
          id="SignupForm"
          method="POST"
          action="register.php"
          style={{ display: showLoginForm ? "none" : "flex" }}
        >
          <p>Your Name</p>
          <span className="show-error">{signupErrors?.name}</span>
          <input type="text" name="name" placeholder="First Name" />

          <p>Email Adress</p>
          <span className="show-error" id="input-field-email">
            {signupErrors?.email}
          </span>
          <input type="email" name="email" placeholder="Email Adress" />
          <p>Usename</p>
          <span className="show-error">{signupErrors?.username}</span>
          <input type="text" name="username" placeholder="Usename" />
          <p>Password</p>
          <span className="show-error">{signupErrors?.password}</span>
          <input type="password" name="password" placeholder="Password" />
          <p>Password Again</p>

          <input
            type="password"
            name="passwordAgain"
            placeholder="Password Again"
          />
          <br />
          <button
            type="submit"
            className="button-green signup-button"
            name="signup"
            onClick={submitSignup}
          >
            Sign Up
          </button>
        </form>

        <div>
          <form
            id="loginForm"
            action="register.php"
            method="POST"
            style={{ display: showLoginForm ? "flex" : "none" }}
          >
            <p>Email/Username</p>
            <span className="show-error">{loginError}</span>
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Email/Username"
            />
            <p>Password</p>
            <input type="password" name="password" placeholder="Password" />
            <button
              type="submit"
              className="button-green login-button"
              name="login-submit"
              onClick={(e) => {
                submitLogin(e);
              }}
            >
              Log In
            </button>
            <a href="#" className="white-text">
              Forgotten Password
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
