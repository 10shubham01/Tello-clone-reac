import React, { Component } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as Trello from "../API/api";
import CreateInput from "./createInput";
import "../style/checkitems.css";
class CheckItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItems: [],
      active: false,
      newCheckitem: "",
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
    this.setState({ checkItems: [newCheckitem, ...this.state.checkItems] });
    this.setState({ newCheckitem: "" });
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
          <FormControlLabel
            control={
              <Checkbox
                checked={item.state === "complete" ? true : false}
                // onChange={}
                name="gilad"
              />
            }
            label={item.name}
          />
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
