import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateProfil from "../components/Profil/UpdateProfil";
import Nav from "../components/Nav";
axios.defaults.baseURL = "http://localhost:5000";

const Profil = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <main className="profil-page">
      {uid ? (
        <>
          <Nav />
          <UpdateProfil />
        </>
      ) : (
        <div className="log-container">
          <Log signin={true} signup={false} />
        </div>
      )}
    </main>
  );
};

export default Profil;
