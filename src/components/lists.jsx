import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../style/lists.css";
import * as Trello from "../API/api";
import Cards from "./cards";
import { Archive } from "react-feather";
import CreateInput from "./createInput";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listName: "",
      active: false,
      backgroundImage: "",
    };
  }
  /* -----------------------------------------------------API CALLS------------------------------------------ */
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
    this.setState({ lists: [...this.state.lists, newList] });
    this.setState({ active: true });
    this.setState({ listName: "" });
  };
  archiveList = async (listId) => {
    console.log("clicked");
    await Trello.archiveList(listId);
    this.setState({ lists: this.state.lists.filter((f) => f.id !== listId) });
  };
  /* ------------------------------------------------------------------------------handleEvents---------------------------------------------------------------------- */
  handleChange = (event) => {
    this.setState({ listName: event.target.value });
  };
  handleFocus = () => {
    this.setState({ active: true });
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
                <Archive
                  style={{
                    position: "absolute",
                    right: "2%",
                    top: "1%",
                    cursor: "pointer",
                  }}
                  onClick={() => this.archiveList(list.id)}
                />
              </h6>
              <Cards boardId={this.props.match.params.id} listId={list.id} />
            </div>
          ))}
          <CreateInput
            placeholder="Add list"
            value={this.state.listName}
            onChange={this.handleChange}
            onClickButton={this.createAList}
            state={this.state.active}
            onMouseDown={() => {
              this.setState({ active: false });
            }}
            onFocus={this.handleFocus}
            buttonText="Add List"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Lists);
