import React, { Component } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Modal } from "react-responsive-modal";
import { Form, Button } from "react-bootstrap";
import "react-responsive-modal/styles.css";

import * as Trello from "../API/api";
import BoardCard from "./boardCard";
import "../style/boards.css";
import { Link } from "react-router-dom";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Boards: [],
      openModal: false,
      boardName: "",
    };
  }
  onClickButton = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => this.setState({ openModal: false });

  handleChange = (event) => {
    this.setState({ boardName: event.target.value });
  };

  async fetchBoards() {
    const Boards = await Trello.getBoards();
    this.setState({ Boards });
  }
  createABoard = async (event) => {
    event.preventDefault();
    const newBoard = await Trello.createABoard(this.state.boardName);
    this.setState({ Boards: [newBoard, ...this.state.Boards] });
    this.setState({ boardName: "" });
    this.onCloseModal();
  };
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
          <div className="board-add" onClick={this.onClickButton}>
            <span className="span1">Create new board</span>
            <span className="span2">5 remaining</span>
            <span className="question">
              <HelpOutlineIcon fontSize="small" />
            </span>
          </div>
        </div>
        {/* --------------------------------------------------- */}

        <Modal
          classNames="modal"
          open={this.state.openModal}
          onClose={this.onCloseModal}
        >
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input
                type="text"
                placeholder="Board name"
                value={this.state.boardName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Label htmlFor="exampleColorInput">Add board title</Form.Label>
            <Form.Control
              type="color"
              id="exampleColorInput"
              defaultValue="#563d7c"
              title="Choose your color"
            />
            <Button variant="primary" type="submit" onClick={this.createABoard}>
              Create board
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Boards;
