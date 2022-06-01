import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <main className="home-page">
      {uid ? (
        <Thread />
      ) : (
        <div className="log-container">
          <Log signin={true} signup={false} />
        </div>
      )}
    </main>
  );
};

export default Home;
