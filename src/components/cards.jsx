import React, { Component } from "react";
import "../style/cards.css";
import { Form, Button } from "react-bootstrap";
import ModalCard from "./modalCard";
import { Link } from "react-router-dom";

import * as Trello from "../API/api";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      active: false,
      CardName: "",
      openModal: false,
      oneCardData: "",
    };
  }
  onClickButton = (e) => {
    e.preventDefault();

    this.setState({ oneCardData: e.target.getAttribute("data-id") });
    this.setState({ openModal: true });
    console.log(this.state.oneCardData);
  };

  onCloseModal = () => this.setState({ openModal: false });

  handleFocus = () => {
    this.setState({ active: true });
  };
  handleChange = (event) => {
    this.setState({ CardName: event.target.value });
  };
  createACard = async (event) => {
    event.preventDefault();
    const newCard = await Trello.createACard(
      this.state.CardName,
      this.props.listId
    );
    this.setState({ cards: [newCard, ...this.state.cards] });
    this.setState({ CardName: "" });
  };
  async getCards() {
    const cards = await Trello.getCards(this.props.boardId);

    this.setState({
      cards: cards.filter((e) => e.idList === this.props.listId),
    });
  }

  componentDidMount() {
    this.getCards();
  }
  render() {
    const { cards } = this.state;

    return (
      <div>
        {cards.map((card) => (
          <div
            className="card"
            style={{ width: "15rem" }}
            key={card.id}
            onClick={this.onClickButton}
          >
            <div className="card-body" data-id={card.id}>
              <h6 className="card-title">{card.name}</h6>
              <p className="card-text"></p>
            </div>
          </div>
        ))}

        <ModalCard
          cardId={this.state.oneCardData}
          state={this.state.openModal}
          onCloseButton={this.onCloseModal}
        />

        <form action="">
          {" "}
          <textarea
            type="text"
            value={this.state.CardName}
            placeholder="&#x2b; Add a Card"
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            style={{
              resize: "none",
            }}
            className={this.state.active ? "onFocus" : ""}
          />
          <Button
            style={{ display: this.state.active ? "block" : "none" }}
            variant="primary"
            type="submit"
            onClick={this.createACard}
          >
            Add Card
          </Button>
        </form>
        {/* ------------------------------------------------------------------------------------------- */}
      </div>
    );
  }
}

export default Card;
