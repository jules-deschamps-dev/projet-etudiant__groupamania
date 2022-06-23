import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const UserInformation = (props) => {
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="info-container">
      <div className="picture-container">
        <img
          src={
            !isEmpty(usersData[0]) &&
            usersData
              .map((user) => {
                if (user.id === props.author) return user.picture;
                else return null;
              })
              .join("") //replace "," by ""
          }
          alt="Avatar utilisateur"
          className="limit-width "
        />

        <span className="author flex">
          {!isEmpty(usersData[0]) &&
            usersData.map((user) => {
              if (user.id === props.author)
                return user.firstName + " " + user.lastName;
              else return null;
            })}
        </span>
      </div>
    </div>
  );
};

export default UserInformation;
