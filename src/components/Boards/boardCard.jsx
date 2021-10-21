import React, { Component } from "react";
import "../../style/boardCard.css";
class BoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div
          className="board"
          style={{
            backgroundImage:
              "url(" + this.props.boardData.prefs.backgroundImage + ")",
          }}
        >
          <div>{this.props.boardData.name}</div>
          <span className={this.getstar(this.props.boardData)}>
            <i className="far fa-star" style={{ fontSize: "13px" }}></i>
          </span>
        </div>
      </div>
    );
  }
  getstar(item) {
    let starClass = "";
    if (item.starred) {
      return starClass + "cStar";
    } else {
      return starClass + "star";
    }
  }
}

export default BoardCard;
