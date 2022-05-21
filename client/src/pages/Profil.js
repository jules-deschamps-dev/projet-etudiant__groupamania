import React from "react";
import Log from "../components/Log";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const Profil = () => {
  return (
    <main className="profil-page">
      <div className="log-container">
        <Log signin={true} signup={false} />
      </div>
    </main>
  );
};

export default Profil;
