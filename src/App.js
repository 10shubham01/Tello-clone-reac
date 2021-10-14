import React from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import NavBar from "./components/navbar";
import Boards from "./components/boards";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Boards />
      </div>
    );
  }
}

export default App;
