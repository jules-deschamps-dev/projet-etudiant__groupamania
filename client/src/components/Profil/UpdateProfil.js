import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { UidContext } from "../AppContext";

import axios from "axios";
import { getUser, updateProfil } from "../../actions/user.actions";

const UpdateProfil = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [bio, setBio] = useState(userData.bio);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleProfil = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
      data: {
        firstName,
        lastName,
        email,
        bio,
      },
    }).then(() => {
      dispatch(getUser);
      setIsUpdating(false);
      window.location.reload();
    });
  };
  return (
    <div className="user-information-container">
      <h2> Bonjour {userData.name}</h2>
      <ul>
        <img
          src={userData.picture}
          alt="photo de profil"
          className="profil-picture"
        />
        <UploadImg />

        <div className="flex column content-container">
          {isUpdating === false && (
            <>
              {" "}
              <h3 className="inline-flex row"> Informations personelles </h3>
              <p className="content">
                <img
                  src="./img/icons/pen.svg"
                  alt="modifier"
                  className="icon inline-flex row"
                  onClick={() => setIsUpdating(true)}
                />
                <br />
                Prénom : {userData.firstName} <br />
                Nom : {userData.lastName} <br />
                Département : {userData.bio} <br />
                email : {userData.email}
              </p>
            </>
          )}
          {isUpdating === true && (
            <div className="update-name">
              <form onSubmit={handleProfil}>
                <label className="flex">
                  Prénom
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    defaultValue={userData.firstName}
                  />
                </label>

                <label className="flex">
                  Nom
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={userData.lastName}
                  />
                </label>

                <label className="flex">
                  Email
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={userData.email}
                  />
                </label>

                <label className="flex">
                  Département
                  <input
                    onChange={(e) => setBio(e.target.value)}
                    defaultValue={userData.bio}
                  />
                </label>
                <input type="submit" value="submit" />
              </form>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default UpdateProfil;
