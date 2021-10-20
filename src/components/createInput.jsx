import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { AlignLeft, Trash, X } from "react-feather";
import "../style/createInput.css";

class CreateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form action="">
        {" "}
        <textarea
          placeholder={this.props.placeholder}
          style={{ resize: "none" }}
          onFocus={this.props.onFocus}
          value={this.props.value}
          onChange={this.props.onChange}
        ></textarea>
        <div className="buttons">
          <Button
            style={{ display: this.props.state ? "block" : "none" }}
            variant="primary"
            type="submit"
            onClick={this.props.onClickButton}
          >
            {this.props.buttonText}
          </Button>
          <Button
            style={{ display: this.props.state ? "block" : "none" }}
            variant="light"
            type="submit"
            onMouseDown={this.props.onMouseDown}
          >
            <X color="#172B4D" />
          </Button>
        </div>
      </form>
    );
  }
}

export default CreateInput;
