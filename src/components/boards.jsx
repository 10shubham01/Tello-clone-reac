import React, { Component } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import StarBorderPurple500RoundedIcon from "@mui/icons-material/StarBorderPurple500Rounded";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Board from "./board";
import "./Style/boards.css";

class Boards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://api.trello.com/1/members/me/boards?url&key=4298ca93f060af6da934044bfa1ab2b2&token=530264e811c33c4aa41e9471743647bf78b1d4b3e2239ab9fa1c0c11fa7c26c1"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1>Data is loading.... </h1>{" "}
        </div>
      );

    return (
      <div>
        <div className="box">
          <div className="boards">
            <h3 style={{ color: "#000" }}>
              {" "}
              <i className="far fa-star" style={{ fontSize: "25px" }}></i>{" "}
              &nbsp; Starred boards
            </h3>
            {items
              .filter((e) => e.starred)
              .map((item) => (
                <div
                  key={item.id}
                  className="board"
                  style={{
                    backgroundImage: "url(" + item.prefs.backgroundImage + ")",
                  }}
                >
                  <div>{item.name}</div>
                  <span className={this.getstar(item)}>
                    <i className="far fa-star" style={{ fontSize: "13px" }}></i>
                  </span>
                </div>
              ))}
          </div>

          <Router>
            <div className="boards">
              <h3>YOUR WORKSPACES</h3>

              {items.map((item) => (
                <Link to={"/board/" + item.id}>
                  {" "}
                  <div
                    key={item.id}
                    className="board"
                    style={{
                      backgroundImage:
                        "url(" + item.prefs.backgroundImage + ")",
                    }}
                  >
                    <div>{item.name}</div>
                    <span className={this.getstar(item)}>
                      <i
                        className="far fa-star"
                        style={{ fontSize: "13px" }}
                      ></i>
                    </span>
                  </div>
                </Link>
              ))}

              <div className="board-add">
                <span className="span1">Create new board</span>
                <span className="span2">5 remaining</span>
                <span className="question">
                  <HelpOutlineIcon fontSize="small" />
                </span>
              </div>
            </div>

            <Route exact path="/board/:id" component={Board}></Route>
          </Router>
        </div>
      </div>
    );
  }
  getstar(item) {
    let starClass = "";
    if (item.starred) {
      return starClass + "cStar";
    } else {
      return starClass + "star";
    }
  }
}

export default Boards;
