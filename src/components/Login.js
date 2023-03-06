import { NavLink } from "react-router-dom";
import "../styles/form.css";
import { useState } from "react";
import { Redirect } from 'react-router-dom';


function LoginForm({exportValue}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let[ isLoading, setIsLoading] = useState(false)
  // input field values
  let [email, setLoginEmail] = useState("");
  let [password, setLoginPassword] = useState("");

  // password visibility
  let [isVisible, setIsVisible] = useState(false);
  let [password_input_type, setPasswordType] = useState("password");

  let visibility = isVisible ? "visibility_off" : "visibility";

  function toggleVisibility() {
    if (!isVisible) {
      setPasswordType("text");
      setIsVisible(true);
    } else {
      setPasswordType("password");
      setIsVisible(false);
    }
  }

  let handleLogin = () => {
    setIsLoading(true);
    let newObj = {
      email,
      password,
    };
    console.log(newObj);
    if (newObj.email !== null && newObj.password !== null) {
      fetch("https://phase3-project.onrender.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }).then((response) => {
        console.log(response);
        setIsLoading(false)
        if (response.status !== 200) {
          console.log("error")
          document.getElementById("login_error").style.visibility = "visible";
        }
        else if (response.status == 200){
          console.log("success")
          setIsLoggedIn(true);
        }
      });
    } else {
      console.log("error");
    }
  }

  if (isLoggedIn) {
    // redirect to the dashboard once the user is logged in
    return <Redirect to="/projectpage" />;
  }

  return (
    <main>
      <div className="shape square"></div>
      <div className="shape circle"></div>
      <div className="shape border"></div>
      <div className="form-container">
        <form action="/login" method="post" className="active" id="login">
          <h2 className="form-title">
            Login<span>.</span>
          </h2>
          <span>
            <h6 id="login_error">Wrong details entered</h6>
            <label>Email</label>
            <input
              onChange={(e) => {
                document.getElementById("login_error").style.visibility = "hidden";
                setLoginEmail(e.target.value);
              }}
              type="email"
              id="login-email"
              className="login-input"
              value={email}
              autoComplete="false"
            ></input>
          </span>
          <label>Password</label>
          <span>
            <input
              onChange={(e) => {
                document.getElementById("login_error").style.visibility = "hidden";
                setLoginPassword(e.target.value);
              }}
              type={password_input_type}
              className="login-input"
              value={password}
              autoComplete="false"
            ></input>
            <i
              onClick={toggleVisibility}
              id="visibility-icon"
              className="material-icons"
            >
              {visibility}
            </i>
          </span>
          <span id="policies">
            <input type="checkbox"></input>
            <h5>Remember me</h5> <h5 id="forgot-msg">Forgot Password?</h5>
          </span>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              exportValue(email)
              handleLogin();
              console.log("password:" + password, "email:" + email);
            }}
          >
            Login<i className="material-icons">arrow_forward</i>
          </button>
          <h5 id="sign-in-msg">
            Don't have an account?
            <NavLink className="navlink" to="sign">
              <span>Sign Up</span>
            </NavLink>
          </h5>
          <div>
            <div id="validation-box">
              
              {isLoading && <div className="login-loader">
              <div class="loader">
                  <svg viewBox="0 0 80 80">
                    <circle id="test" cx="40" cy="40" r="32"></circle>
                  </svg>
                </div>
              </div>}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
