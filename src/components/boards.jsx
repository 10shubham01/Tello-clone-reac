import React, { Component } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import * as Trello from "../API/api";
import BoardCard from "./boardCard";
import "../style/boards.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Boards: [],
    };
  }
  async fetchBoards() {
    const Boards = await Trello.getBoards();
    this.setState({ Boards });
  }
  async createABoard() {
    const newBoard = await Trello.createABoard();
    this.setState({ Boards: [newBoard, ...this.state.Boards] });
  }
  componentDidMount() {
    this.fetchBoards();
  }
  render() {
    const { Boards } = this.state;
    return (
      <div className="boards">
        <div className="boards-conatiner">
          <h3 style={{ color: "#000" }}>
            {" "}
            <i className="far fa-star" style={{ fontSize: "25px" }}></i> &nbsp;
            Starred boards
          </h3>
          {Boards.filter((e) => e.starred).map((board) => (
            <BoardCard boardData={board} key={board.id} />
          ))}
        </div>

        <div className="boards-conatiner">
          <h3>YOUR WORKSPACES</h3>
          {Boards.map((board) => (
            <Link to={`/boards/${board.id}`}>
              <BoardCard boardData={board} key={board.id} />
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
      </div>
    );
  }
}

export default Boards;
