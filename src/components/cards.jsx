import React, { Component } from "react";
import "../style/cards.css";
import { Trash } from "react-feather";
import CreateInput from "./createInput";
import { Link } from "react-router-dom";
import * as Trello from "../API/api";
class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      active: false,
      CardName: "",
    };
  }

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
    this.setState({ cards: [...this.state.cards, newCard] });
    this.setState({ active: true });

    this.setState({ CardName: "" });
  };
  async getCards() {
    const cards = await Trello.getCards(this.props.boardId);
    this.setState({
      cards: cards.filter((e) => e.idList === this.props.listId),
    });
  }
  deleteCard = async (cardId) => {
    // event.preventDefault();
    await Trello.deleteCard(cardId);
    this.setState({ cards: this.state.cards.filter((f) => f.id !== cardId) });
  };
  componentDidMount() {
    this.getCards();
  }
  render() {
    const { cards } = this.state;

    return (
      <div>
        {cards.map((card) => (
          <div className="card" style={{ width: "16rem" }} key={card.id}>
            <Link to={`/boards/:id/popup/${card.id}`}>
              <div className="card-body" data-id={card.id}>
                <h6 className="card-title">{card.name} </h6>
              </div>
            </Link>

            <Trash
              size={18}
              style={{ margin: "5px", cursor: "pointer" }}
              onClick={() => this.deleteCard(card.id)}
            />
          </div>
        ))}

        <CreateInput
          placeholder="&#x2b; Add a Card"
          onFocus={this.handleFocus}
          state={this.state.active}
          value={this.state.CardName}
          onChange={this.handleChange}
          onClickButton={this.createACard}
          onMouseDown={() => {
            this.setState({ active: false });
          }}
          buttonText="Add Card"
        />
        {/* ------------------------------------------------------------------------------------------- */}
      </div>
    );
  }
}

export default Card;
