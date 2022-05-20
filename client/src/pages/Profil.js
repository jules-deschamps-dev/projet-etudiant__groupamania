import React from "react";
import Log from "../components/Log";

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
