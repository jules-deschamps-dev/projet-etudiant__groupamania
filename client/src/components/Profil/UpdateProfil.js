import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div>
      <h2> Bonjour {userData.name}</h2>
      <ul>
        <img src={userData.picture} />
        <UploadImg />
        {userData.bio}
      </ul>
    </div>
  );
};

export default UpdateProfil;
