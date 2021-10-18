import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../style/lists.css";
import * as Trello from "../API/api";
import Cards from "./cards";
class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      listName: "",
      backgroundImage: "",
    };
  }
  handleChange = (event) => {
    this.setState({ listName: event.target.value });
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
    this.setState({ listName: "" });
  };
  handleFocus = (event) => event.target.select();

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
              <h6>{list.name}</h6>
              <Cards boardId={this.props.match.params.id} listId={list.id} />
            </div>
          ))}
          <form action="">
            <input
              type="text"
              value={this.state.listName}
              onChange={this.handleChange}
            />
            <button onClick={this.createAList}>CreateList</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Lists);
