import React, { Component } from "react";
import "../style/sideNavBar.css";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  cheack() {
    const inRoutes = ["/", "/home", "/boards"];
    if (inRoutes.includes(window.location.pathname)) {
      this.setState({ active: true });
    }
  }
  componentDidMount() {
    this.cheack();
  }

  render() {
    return (
      <div>
        <div className={this.state.active ? "side-nav" : "hide"}>
          <ul>
            <Link to="/boards">
              {" "}
              <li>
                <LeaderboardIcon fontSize="smallest" />
                &nbsp; Boards
              </li>
            </Link>
            <Link to="/templates">
              {" "}
              <li>
                <i className="fas fa-columns"></i> &nbsp;Templates
              </li>
            </Link>
            <Link to="/">
              {" "}
              <li>
                <MicrowaveOutlinedIcon fontSize="smallest" /> Home
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default SideNavBar;
