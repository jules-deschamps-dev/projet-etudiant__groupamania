import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    axios({
      method: "post",
      url: `api/user/register`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div id="connexionBloc">
        <h1> Inscription </h1>
        <form
          action=""
          onSubmit={handleRegister}
          id="signup-form"
          className="flex column"
        >
          <div className="flex row">
            <div className="flex column w50 txt-right">
              <label htmlFor="text"> Email </label>
              <br />
              <label htmlFor="text"> Mot de passe </label>
            </div>

            <div className="flex column w40 txt-left">
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <div id="email-error"></div>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <div id="password-error"></div>
            </div>
          </div>
          <input
            type="submit"
            value="S'inscrire"
            //onClick={connect()}
            id="submitConnexionButton"
            className="margin w30"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
