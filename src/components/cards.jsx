import React, { Component } from "react";
import "../style/cards.css";
class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    fetch(
      `https://api.trello.com/1/boards/${this.props.boardId}/cards?key=4298ca93f060af6da934044bfa1ab2b2&token=530264e811c33c4aa41e9471743647bf78b1d4b3e2239ab9fa1c0c11fa7c26c1`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json.filter((e) => e.idList === this.props.listId),
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1>Data is loading.... </h1>{" "}
        </div>
      );

    return (
      <div>
        {items.map((item) => (
          <div className="card" style={{ width: "15rem" }}>
            <div className="card-body">
              <h6 className="card-title">{item.name}</h6>
              <p className="card-text"></p>
            </div>
          </div>
        ))}
        <input type="text" value="Add a Card" />
      </div>
    );
  }
}

export default Card;
