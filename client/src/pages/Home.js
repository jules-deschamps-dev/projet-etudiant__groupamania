import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
//import { useSelector } from "react-redux";
import Thread from "../components/Thread";
import Nav from "../components/Nav";
import NewPost from "../components/Post/NewPost";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <main className="home-page">
      {uid ? (
        <>
          <NewPost />
          <Thread />
        </>
      ) : (
        <div className="log-container">
          <Log signin={true} signup={false} />
        </div>
      )}
    </main>
  );
};

export default Home;
