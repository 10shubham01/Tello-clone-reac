import React, { Component } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as Trello from "../../API/api";
import CreateInput from "../createInput";
import "../../style/checkitems.css";
import { Trash } from "react-feather";

class CheckItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItems: [],
      active: false,
      newCheckitem: "",
      state: "incomplete",
    };
  }

  getCheckItems = async () => {
    const checkItems = await Trello.getCheckItems(this.props.checklistId);
    this.setState({ checkItems });
  };

  createCheckItems = async (event) => {
    event.preventDefault();
    const newCheckitem = await Trello.createCheckItems(
      this.state.newCheckitem,
      this.props.checklistId
    );
    this.setState({ checkItems: [...this.state.checkItems, newCheckitem] });
    this.setState({ newCheckitem: "" });
  };
  deleteCheckItems = async (itemid) => {
    await Trello.deleteCheckItems(this.props.checklistId, itemid);
    this.setState({
      checkItems: this.state.checkItems.filter((f) => f.id !== itemid),
    });
  };
  checkUncheck = async (itemId) => {
    const checked = Trello.checkUncheck(
      this.props.cardId,
      itemId,
      this.state.state
    );
  };
  handleCheck = (itemId, e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.setState({ state: "complete" });
    } else {
      this.setState({ state: "incomplete" });
    }
    this.checkUncheck(itemId);
  };
  handleFocus = () => {
    this.setState({ active: true });
  };
  change = (e) => {
    this.setState({ newCheckitem: e.target.value });
  };
  componentDidMount() {
    this.getCheckItems();
  }

  render() {
    return (
      <div className="checkitems">
        {this.state.checkItems.map((item) => (
          <div className="heading">
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.state === "complete" ? true : false}
                  onChange={(e) => this.handleCheck(item.id, e)}
                />
              }
              label={item.name}
            />
            <Trash
              size={18}
              style={{ margin: "5px", cursor: "pointer" }}
              onClick={() => this.deleteCheckItems(item.id)}
            />
          </div>
        ))}{" "}
        <CreateInput
          placeholder="Add checkitem"
          onFocus={this.handleFocus}
          state={this.state.active}
          value={this.state.newCheckitem}
          onClickButton={this.createCheckItems}
          onMouseDown={() => {
            this.setState({ active: false });
          }}
          buttonText="Add item"
          onChange={this.change}
        />
      </div>
    );
  }
}

export default CheckItems;
