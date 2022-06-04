import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Nav from "../Nav";

const index = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;
