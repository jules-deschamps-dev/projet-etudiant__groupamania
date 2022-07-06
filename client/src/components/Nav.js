import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { reload } from "./Utils";

const Nav = () => {
  return (
    <div className="nav-bar flex row">
      <div className="icon">
        <NavLink exact to="/">
          <img
            src="./img/icons/icon-left-font-monochrome-white.png"
            alt="home-page"
            className="icon"
            onClick={() => reload("/")}
          />
        </NavLink>
      </div>
      <div className="flex row margin limit-height">
        <div className="subnav-icon limit-height ">
          <NavLink exact to="/">
            <img
              src="./img/icons/house-white.png"
              alt="home-page"
              className="icon"
              onClick={() => reload("/")}
            />
          </NavLink>
        </div>
        <div className="subnav-icon limit-height">
          <NavLink exact to="/profil">
            <img
              src="./img/icons/user-white.png"
              alt="home-page"
              className="icon"
              onClick={() => reload("/profil")}
            />
          </NavLink>
        </div>
      </div>
      <div className="icon logout-container">
        <NavLink exact to="/">
          <Logout />
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
