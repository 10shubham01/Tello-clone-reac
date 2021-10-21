import React, { Component } from "react";
import CheckItems from "./checkitems";
import { Trash } from "react-feather";

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.data.map((list) => (
          <div className="checklist">
            <div className="heading">
              {list.name}
              <Trash
                size={18}
                style={{ margin: "5px", cursor: "pointer" }}
                onClick={() => this.props.delete(list.id)}
              />
            </div>
            <CheckItems
              checklistId={list.id}
              cardId={list.idCard}
              key={list.id}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default CheckList;
