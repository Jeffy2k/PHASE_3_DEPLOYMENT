import { useState } from "react";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/form.css";

function SignForm() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  // form properties
  let [isVisible, setIsVisible] = useState(false);
  let [password_input_type, setPasswordType] = useState("password");
  let [isConfirmVisible, setIsConfirmVisible] = useState(false);
  let [password_confirm_input_type, setPasswordConfirmType] =
    useState("password");
  let [isSignUpVisible, setIsSignUp] = useState(true);
  let [isLoginVisible, setIsLogin] = useState(true);
  let [isSecondStepVisible, setIsSecondStep] = useState(true);

  // input values
  let [first_name, setFirstName] = useState("");
  let [last_name, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password_confirm, setPasswordConfirm] = useState("");
  let [career, setExpertise] = useState("");
  let [bio, setDescription] = useState("");

  let signUpClass = isSignUpVisible ? "active" : "inactive";
  let secondStepClass = isSecondStepVisible ? "inactive" : "active";
  let loginClass = isLoginVisible ? "inactive" : "active";

  let visibility = isVisible ? "visibility_off" : "visibility";
  let confirm_visibility = isConfirmVisible ? "visibility_off" : "visibility";

  // toggle password field visibility
  function toggleVisibility(value) {
    if (value === "password") {
      if (!isVisible) {
        setPasswordType("text");
        setIsVisible(true);
      } else {
        setPasswordType("password");
        setIsVisible(false);
      }
    }
    if (value === "confirm") {
      if (!isConfirmVisible) {
        setPasswordConfirmType("text");
        setIsConfirmVisible(true);
      } else {
        setPasswordConfirmType("password");
        setIsConfirmVisible(false);
      }
    }
  }

  // toggle bettween sign-up form and login form
  function toggleform(value, elem, event) {
    if (value === "description-form") {
      const formInputs = document.querySelectorAll(".sign-up-input");

      // validate input fields
      const allInputsFilled = Array.from(formInputs).every(
        (input) => input.value !== ""
      );

      const empty_fields = Array.from(formInputs).filter(
        (input) => input.value === ""
      );

      let empty_fields_ids_arr = [];

      const empty_fields_ids = empty_fields.map((field) =>
        empty_fields_ids_arr.push(field.id)
      );

      // validate email formats
      let email = document.getElementById("sign-up-email").value;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let email_verification = regex.test(email);

      if (allInputsFilled) {
        console.log("All form inputs have been filled!");
        if (email_verification) {
          if (password === password_confirm) {
            setIsSignUp(false);
            setIsSecondStep(false);
            document.getElementById("email-error").style.visibility = "hidden";
            document.getElementById("password-error").style.visibility =
              "hidden";
          } else {
            // alert("Please enter")
            document.getElementById("password-error").style.visibility =
              "visible";
          }
        } else {
          document.getElementById("email-error").style.visibility = "visible";
        }
      } else {
        empty_fields_ids_arr.map((field) => {
          document.getElementById(`${field}`).style.borderBottom =
            "1px solid red";
        });
      }
    }
    if (value === "back") {
      setIsSignUp(true);
      setIsSecondStep(true);
    }
  }

  // validate the form entries
  function validateEntries() {
    let input = document.querySelector(".description-input");
    let description = document.querySelector("textarea");

    if (description.value && input.value) {
      alert("Proceed");
    } else if (!description.value && !input.value) {
      input.style.borderBottom = "1px solid red";
      description.style.border = "1px solid red";
    } else if (!description.value) {
      description.style.border = "1px solid red";
    } else if (!input.value) {
      input.style.borderBottom = "1px solid red";
    }
  }

  function restoreBorderColor() {
    console.log(".......");
    const formInputs = document.querySelectorAll(".sign-up-input");

    const all_fields = Array.from(formInputs).filter((input) => input);

    let all_fields_ids_arr = [];

    const all_fields_ids = all_fields.map((field) =>
      all_fields_ids_arr.push(field.id)
    );

    all_fields_ids_arr.map((field) => {
      document.getElementById(`${field}`).style.borderBottom =
        "1px solid black";
    });
  }

  // handle post request
  let handlePosting = () => {
    console.log("active post");
    let newObj = {
      first_name,
      last_name,
      email,
      bio,
      career,
      password,
    };
    if (
      newObj.first_name !== null &&
      newObj.last_name !== null &&
      newObj.bio !== null &&
      newObj.career !== null &&
      newObj.email !== null &&
      newObj.password !== null
    ) {
      fetch("https://phase3-project.onrender.com/add/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }).then((response) => {
        console.log(response);
      });
      setIsLoggedIn(true);
    } else {
      console.log("error");
    }
  };

  if (isLoggedIn) {
    // redirect to the dashboard once the user is logged in
    return <Redirect to="/login" />;
  }


  return (
    <main>
      <div className="shape square"></div>
      <div className="shape circle"></div>
      <div className="shape border"></div>
      <div className="form-container">
        <form className={signUpClass} id="sign-up">
          <h2>
            Sign up<span>.</span>
          </h2>
          <span id="names">
            <span>
              <label for="firstname">Firstname</label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                  restoreBorderColor();
                }}
                type="text"
                id="firstname"
                className="sign-up-input"
                value={first_name}
              ></input>
            </span>
            <span>
              <label id="lastname-label">Lastname</label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                  restoreBorderColor();
                }}
                type="text"
                id="lastname"
                className="sign-up-input"
                value={last_name}
                autoComplete="false"
              ></input>
            </span>
          </span>
          <label>Email</label>
          <span id="email-span">
            <h6 id="email-error">*wrong format</h6>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                document.getElementById("email-error").style.visibility =
                  "hidden";
                restoreBorderColor();
              }}
              id="sign-up-email"
              type="email"
              className="sign-up-input"
              value={email}
              autoComplete="false"
            ></input>
          </span>
          <label>Password</label>
          <span id="password-span">
            <h6 id="password-error">*password does not match</h6>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                restoreBorderColor();
              }}
              id="sign-up-password"
              type={password_input_type}
              className="sign-up-input"
              maxLength="16"
              value={password}
              autoComplete="false"
            ></input>
            <i
              onClick={() => {
                toggleVisibility("password");
              }}
              id="visibility-icon"
              className="material-icons"
            >
              {visibility}
            </i>
          </span>
          <label>Confirm password</label>
          <span>
            <input
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                document.getElementById("password-error").style.visibility =
                  "hidden";
                restoreBorderColor();
              }}
              id="sign-up-confirm-password"
              type={password_confirm_input_type}
              className="sign-up-input"
              value={password_confirm}
              autoComplete="false"
            ></input>
            <i
              onClick={() => {
                toggleVisibility("confirm");
              }}
              id="visibility-icon"
              className="material-icons"
            >
              {confirm_visibility}
            </i>
          </span>
          <span id="policies">
            <input type="checkbox" autoComplete="false" required></input>
            <h5>
              I Agree with the <span>terms and conditions</span>
            </h5>
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleform("description-form", "sign-up");
            }}
          >
            Next<i className="material-icons">arrow_forward</i>
          </button>
          <h5 id="sign-in-msg">
            Already have an account?
            <NavLink className="navlink" to="/login">
              <span onClick={(e) => {}}>Sign in</span>
            </NavLink>
          </h5>
        </form>
        <form className={secondStepClass} id="description-form">
          <i
            onClick={() => {
              toggleform("back", "sign-up");
            }}
            id="backStep1"
            className="material-icons"
          >
            arrow_backward
          </i>
          <h2>
            Almost done :<span>)</span>
          </h2>
          <label>Field of Expertise</label>
          <input
            onChange={(e) => {
              setExpertise(e.target.value);
              document.querySelector(".description-input").style.borderBottom =
                "1px solid black";
            }}
            type="text"
            className="description-input"
            value={career}
            autoComplete="false"
          ></input>
          <label>Bio</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
              document.querySelector("textarea").style.border =
                "1px solid black";
            }}
            value={bio}
            autoComplete="false"
          ></textarea>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePosting();
              validateEntries();
            }}
          >
            Sign up<i className="material-icons">arrow_forward</i>
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignForm;
