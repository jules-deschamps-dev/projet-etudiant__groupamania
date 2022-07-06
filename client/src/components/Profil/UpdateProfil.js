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
  const [departement, setDepartement] = useState(userData.departement);
  const [isUpdating, setIsUpdating] = useState(false);

  const error = useSelector((state) => state.errorsReducer.userErrors);
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
        departement,
      },
    }).then(() => {
      dispatch(getUser);
      setIsUpdating(false);
      window.location.reload();
    });
  };

  const cancleUpdate = () => {
    setIsUpdating(false);
  };

  return (
    <div className="user-information-container">
      <h2 className="userName"> {userData.name}</h2>
      <div>
        <UploadImg />

        <div className="flex column content-container">
          {isUpdating === false && (
            <>
              <div className="flex row margin">
                <h3 className="inline-flex row"> Informations personelles </h3>
                <img
                  src="./img/icons/pen-circle.svg"
                  alt="modifier"
                  className="icon30 inline-flex row"
                  onClick={() => setIsUpdating(true)}
                />
              </div>
              <div className="flex content">
                <br />
                <div className="flex row margin min-width">
                  <ul className="flex column txt-right">
                    <li>Prénom</li>
                    <li>Nom</li>
                    <li>Email </li>
                    <li>Département</li>
                  </ul>
                  <ul className="moderate-x-space margin center">
                    <li> | </li>
                    <li> | </li>
                    <li> | </li>
                    <li> | </li>
                  </ul>
                  <ul className="flex column txt-left">
                    <li>{userData.firstName}</li>
                    <li>{userData.lastName}</li>
                    <li>{userData.email}</li>
                    <li>{userData.departement}</li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {isUpdating && (
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

                {userData.isAdmin ? (
                  <label className="flex">
                    Département
                    <img
                      src="./img/icons/lock.svg"
                      alt="lock"
                      className="icon"
                    />
                  </label>
                ) : (
                  <label className="flex">
                    Département
                    <select name="departement">
                      <option value="Administration">Administration</option>
                      <option value="Comptabilité">Comptabilité</option>
                      <option value="Direction">Direction</option>
                      <option value="Informatique">Informatique</option>
                      <option value="Logistique">Logistique</option>
                      <option value="RH">RH</option>
                      <option value="Ventes">Ventes</option>
                    </select>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={userData.email}
                    />
                  </label>
                )}

                <div className="flex row margin min-width ">
                  <button onClick={cancleUpdate}>
                    <img
                      src="./img/icons/xmark.png"
                      alt="cancel"
                      className="h100"
                    />
                  </button>
                  <input type="submit" value="submit" />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
