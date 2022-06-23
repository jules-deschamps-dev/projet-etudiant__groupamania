import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Thread from "../components/Thread";
import NewPost from "../components/Post/NewPost";
import Nav from "../components/Nav";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <>
          <Nav />
          <div className="home-page">
            <NewPost />
            <Thread />
          </div>
        </>
      ) : (
        <div>
          <Log signin={true} signup={false} />
        </div>
      )}
    </>
  );
};

export default Home;
