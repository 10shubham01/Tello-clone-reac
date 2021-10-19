import React, { Component } from "react";
import "../style/sideNavBar.css";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MicrowaveOutlinedIcon from "@mui/icons-material/MicrowaveOutlined";
import { Link } from "react-router-dom";
import { AlignRight } from "react-feather";

class SideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  handleHide = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    return (
      <div>
        <div className={this.state.active ? "side-nav" : "side-nav shrink"}>
          <AlignRight
            className={this.state.active ? "hide" : "hamburger"}
            onClick={this.handleHide}
          />
          <ul className={this.state.active ? "" : "hide"}>
            <Link to="/boards">
              {" "}
              <li onClick={this.handleHide}>
                <LeaderboardIcon fontSize="smallest" />
                &nbsp; Boards
              </li>
            </Link>
            <Link to="/templates">
              {" "}
              <li onClick={this.handleHide}>
                <i className="fas fa-columns"></i> &nbsp;Templates
              </li>
            </Link>
            <Link to="/">
              {" "}
              <li onClick={this.handleHide}>
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
