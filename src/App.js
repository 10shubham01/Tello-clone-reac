import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Boards from "./components/Boards/boards";
import Lists from "./components/Lists/lists";
import PopUp from "./components/PopupWindow/PopUp";
import NavBar from "./components/Navbar/navbar";
import SideNavBar from "./components/Navbar/sideNavBar";
import Home from "./components/home";

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
        <Route path="/boards/:id/popup/:id" component={PopUp} />
      </Router>
    );
  }
}

export default App;
