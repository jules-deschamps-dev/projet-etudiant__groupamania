import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { UidContext } from "../AppContext";
import axios from "axios";
import { getUsers } from "../../actions/users.actions";

const UpdateProfil = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [bio, setBio] = useState(userData.email);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleProfil = () => {
    axios({
      method: "put",
      url: `api/user/${uid}`,
      withCredentials: true,
      data: {
        firstName,
        lastName,
        email,
        bio,
      },
    }).then(() => {
      dispatch(getUsers);
      setIsUpdating(false);
    });
  };

  return (
    <div>
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
              <p className="content">
                <h3 className="inline-flex row"> Informations personelles </h3>
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
