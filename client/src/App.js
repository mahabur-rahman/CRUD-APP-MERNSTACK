import React from "react";
// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// global style
import "./global.scss";
// react router dom
import { Switch, Route } from "react-router-dom";
// comp
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit";
import DetailsPage from "./components/Details";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/view/:id" component={DetailsPage} />
      </Switch>
    </>
  );
};

export default App;
