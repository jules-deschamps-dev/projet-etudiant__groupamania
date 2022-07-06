import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const error = document.getElementById("error");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== checkPassword)
      error.innerHTML = "Les mots de passe ne correspondent pas";
    else {
      axios({
        method: "post",
        url: `api/user/register`,
        withCredentials: true,
        data: {
          email,
          password,
          lastName,
          firstName,
        },
      })
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          error.innerHTML = err.response.data.error;
          if (err.response.data.error.email)
            error.innerHTML = err.response.data.error.email;
          //error.innerHTML = err.response.data.erreur;
          //console.log(err.response.data);
        });
    }
  };

  return (
    <div id="connexionBloc">
      <h1> Inscription </h1>
      <p id="error" className="errors"></p>
      <form
        action=""
        onSubmit={handleRegister}
        id="signup-form"
        className="flex column"
      >
        <div className="flex row">
          <div className="flex column margin regiser-form txt-right">
            <label htmlFor="text">
              Email
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </label>
            <label htmlFor="text">
              Mot de passe
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </label>
            <label htmlFor="text">
              Confirmation
              <input
                type="password"
                name="checkPassword"
                id="checkPassword"
                onChange={(e) => setCheckPassword(e.target.value)}
                value={checkPassword}
                required
              />
            </label>
            <label htmlFor="text">
              Prénom
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </label>
            <label htmlFor="text">
              Nom
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </label>
          </div>
        </div>
        <div className="margin">
          <input
            type="submit"
            value="S'inscrire"
            //onClick={connect()}
            id="submitConnexionButton"
            className="margin w30"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
