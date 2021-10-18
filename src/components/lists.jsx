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
      value: "",
    };
  }
  async fetchLists() {
    const lists = await Trello.getOneBoards(this.props.match.params.id);
    this.setState({ lists: lists });
  }
  handleFocus = (event) => event.target.select();
  handleChange = (event) => this.setState({ value: event.target.value });
  componentDidMount() {
    this.fetchLists();
  }
  render() {
    const { lists } = this.state;
    return (
      <div className="lists">
        <div className="lists-container">
          {lists.map((list) => (
            <div className="list">
              <input
                type=""
                value={list.name}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
              />
              <Cards boardId={this.props.match.params.id} listId={list.id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Lists);
