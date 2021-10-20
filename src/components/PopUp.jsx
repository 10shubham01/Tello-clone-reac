import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Trello from "../API/api";

import { AlignLeft, Layout, X, CheckSquare } from "react-feather";
import Popover from "@mui/material/Popover";

import CheckList from "./checklist";

import "../style/popup.css";
import CreateInput from "./createInput";
class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
      active: false,
      checklists: [],
      newChecklist: "",
      anchorEl: null,
    };
  }
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  getOneCard = async () => {
    const card = await Trello.getOneCard(this.props.match.params.id);
    this.setState({ card });
    this.getChecklist();
  };
  getChecklist = async () => {
    const checklists = await Trello.getChecklist(this.state.card.id);
    this.setState({ checklists });
  };
  createAChecklist = async (event) => {
    event.preventDefault();
    const newChecklist = await Trello.createAChecklist(
      this.state.newChecklist,
      this.state.card.id
    );
    this.setState({ checklists: [newChecklist, ...this.state.checklists] });
    this.setState({ newChecklist: "" });
  };
  deleteChecklist = async (checklistID) => {
    await Trello.deleteChecklist(checklistID);
    this.setState({
      cards: this.state.checklists.filter((f) => f.id !== checklistID),
    });
  };

  handleFocus = () => {
    this.setState({ active: true });
  };

  handleChange = (event) => {
    this.setState({ newChecklist: event.target.value });
  };
  componentDidMount() {
    this.getOneCard();
  }
  render() {
    const { card } = this.state;
    return (
      <div className="popup-window">
        <div className="popup">
          <button onClick={this.props.history.goBack}>
            <X color="#172B4D" />
          </button>
          <div className="container">
            {/* ---------------------------------------------------------- */}
            <div className="heading">
              <Layout color="#172B4D" size={20} />
              <h5>{card.name}</h5>
            </div>
            {/* --------------------------------------------------------------------------- */}
            <div className="description">
              <h3>
                {" "}
                <AlignLeft color="#172B4D" size={20} /> Description
              </h3>
              <p>{card.desc}</p>
            </div>
            {/* ---------------------------------------------------------------------- */}
            <div className="rightmenu">
              <ul>
                <li onMouseUp={this.handleClick}>
                  {" "}
                  <CheckSquare size={20} />
                  &nbsp; checklist
                </li>
              </ul>
            </div>
            <Popover
              open={Boolean(this.state.anchorEl)}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <CreateInput
                placeholder="&#x2b; Add List"
                onFocus={this.handleFocus}
                state={this.state.active}
                value={this.state.newChecklist}
                onChange={this.handleChange}
                onClickButton={this.createAChecklist}
                onMouseDown={() => {
                  this.setState({ active: false });
                }}
                buttonText="Add Checklist"
              />
            </Popover>
            {/* ---------------------------------------------------------------------- */}
            <div className="checklist-container">
              <CheckList
                data={this.state.checklists}
                delete={this.deleteChecklist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PopUp);
