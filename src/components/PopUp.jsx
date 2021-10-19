import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as Trello from "../API/api";
import { Button } from "react-bootstrap";
import { AlignLeft, Layout, X, CheckSquare, Trash } from "react-feather";

import "../style/popup.css";
class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: {},
      active: false,
    };
  }

  getOneCard = async () => {
    // event.preventDefault();
    const card = await Trello.getOneCard(this.props.match.params.id);
    this.setState({ card });
  };

  handleFocus = () => {
    this.setState({ active: true });
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
              <textarea
                placeholder="Add a more detailed description..."
                value={card.desc}
                style={{ resize: "none" }}
                onFocus={this.handleFocus}
              ></textarea>
              <div className="buttons">
                <Button
                  style={{ display: this.state.active ? "block" : "none" }}
                  variant="primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  style={{ display: this.state.active ? "block" : "none" }}
                  variant=""
                  type="submit"
                  onMouseDown={() => {
                    this.setState({ active: false });
                  }}
                >
                  <X color="#172B4D" />
                </Button>
              </div>
            </div>
            {/* ---------------------------------------------------------------------- */}
            <div className="rightmenu">
              <ul>
                <li>
                  {" "}
                  <CheckSquare size={20} />
                  &nbsp; checklist
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PopUp);
