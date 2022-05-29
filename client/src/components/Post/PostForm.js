import axios from "axios";
import React, { useState } from "react";

const Post = () => {
  const [title, setEmail] = useState("");
  const [content, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const titleError = document.getElementById("post-title-error");
    const contentError = document.getElementById("post-content-error");
    axios({
      method: "post",
      url: `api/post/create`,
      withCredentials: false,
      data: {
        title,
        content,
        author: document.cookie.email,
        firstName,
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
              <label htmlFor="text"> Mot de passe </label>
              <label htmlFor="text"> Nom </label>
              <label htmlFor="text"> Prénom </label>
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
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
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