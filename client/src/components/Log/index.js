import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const handleModals = (event) => {
    if (event.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (event.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div>
      <div className="connection-form">
        <div className="form-container">
          <ul className="log-list">
            <li
              onClick={handleModals}
              id="register"
              className={signUpModal ? "active-btn" : "log-list-element"}
            >
              S'inscrire
            </li>
            <li
              onClick={handleModals}
              id="login"
              className={signInModal ? "active-btn" : "log-list-element"}
            >
              Se connecter
            </li>
          </ul>
          {signUpModal && <SignUpForm />}
          {signInModal && <SignInForm />}
        </div>
      </div>
    </div>
  );
};

export default Log;
