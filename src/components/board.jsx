import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div>Board {this.props.match.params.id}</div>;
  }
}

export default withRouter(Board);
