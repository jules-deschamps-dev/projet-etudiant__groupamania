import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const UserInformation = (props) => {
  const usersData = useSelector((state) => state.usersReducer);
  let admin = "";

  return (
    <div className="info-container">
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
        className="picture limit-width "
      />

      <div className="info-user-txt-container">
        <span className="author flex">
          {!isEmpty(usersData[0]) &&
            usersData.map((user) => {
              if (user.id === props.author)
                return user.firstName + " " + user.lastName;
              else return null;
            })}
        </span>

        <span className="bio">
          {!isEmpty(usersData[0]) &&
            usersData.map((user) => {
              if (user.id === props.author) {
                {
                  user.isAdmin ? (admin = "adminColor") : (admin = "");
                }
                return <span className={admin}> {user.departement} </span>;
              } else return null;
            })}
        </span>
      </div>
    </div>
  );
};

export default UserInformation;
