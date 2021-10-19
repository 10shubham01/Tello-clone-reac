import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../style/modalCard.css";
import { withRouter } from "react-router-dom";

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Modal
          classNames="modal"
          open={this.props.state}
          onClose={this.props.onCloseButton}
        >
          {this.props.cardId}
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalCard);
