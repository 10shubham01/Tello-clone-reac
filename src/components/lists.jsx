import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../style/lists.css";
import * as Trello from "../API/api";
import Cards from "./cards";
import { MoreHorizontal, X } from "react-feather";
import CreateInput from "./createInput";
import Popover from "@mui/material/Popover";
import { Form, Button } from "react-bootstrap";
import { AlignLeft, Trash } from "react-feather";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listName: "",
      active: false,
      backgroundImage: "",
      setAnchorEl: null,
    };
  }
  handleChange = (event) => {
    this.setState({ listName: event.target.value });
  };
  handleFocus = () => {
    this.setState({ active: true });
  };
  async fetchLists() {
    const lists = await Trello.getOneBoards(this.props.match.params.id);
    this.setState({ lists: lists });
  }
  async getBackgroundImage() {
    const backgroundImage = await Trello.getBackgroundImage(
      this.props.match.params.id
    );

    this.setState({ backgroundImage: backgroundImage.prefs.backgroundImage });
  }

  createAList = async (event) => {
    event.preventDefault();
    const newList = await Trello.createAList(
      this.props.match.params.id,
      this.state.listName
    );
    this.setState({ lists: [newList, ...this.state.lists] });
    this.setState({ active: true });

    this.setState({ listName: "" });
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {
    this.fetchLists();
    this.getBackgroundImage();
  }
  render() {
    const { lists } = this.state;
    return (
      <div
        className="lists"
        style={{
          backgroundImage: "url(" + this.state.backgroundImage + ")",
        }}
      >
        <div className="lists-container">
          {lists.map((list) => (
            <div className="list">
              <h6>
                {list.name}{" "}
                <MoreHorizontal
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "2%",
                    cursor: "pointer",
                  }}
                  onClick={this.handleClick}
                />
              </h6>
              <Cards boardId={this.props.match.params.id} listId={list.id} />
            </div>
          ))}
          <CreateInput
            value={this.state.listName}
            onChange={this.handleChange}
            onClickButton={this.createAList}
            state={this.state.active}
            onMouseDown={() => {
              this.setState({ active: false });
            }}
            onFocus={this.handleFocus}
          />
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className="popover"
          >
            <ul>
              <li>Delete</li>
              <li>Archive</li>
            </ul>
          </Popover>
        </div>
      </div>
    );
  }
}

export default withRouter(Lists);
