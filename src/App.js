import React, { Component } from "react";
import "./App.css";
import Boards from "./components/boards";
import Lists from "./components/lists";

import NavBar from "./components/navbar";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SideNavBar from "./components/sideNavBar";
import Home from "./components/home";
import { Check } from "@mui/icons-material";
import ModalCard from "./components/modalCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <NavBar />
        <SideNavBar />

        <Route path="/" exact component={Home}></Route>
        <Route path="/boards" exact component={Boards} />
        <Route path="/boards/:id" component={Lists} />
        <Route path="/boards/:id/cards/:id" />
      </Router>
    );
  }
}

export default App;
