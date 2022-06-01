import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "./components/AppContext";
import { getUser } from "./actions/user.actions";
import Routes from "./components/Routes";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = () => {
      axios({
        method: "get",
        url: "token",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data.id);
          console.log("uid ", res.data.id);
        })
        .catch((err) => console.log("No token", err));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid));
  });

  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
};

export default App;
