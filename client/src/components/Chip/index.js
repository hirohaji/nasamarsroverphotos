import React from "react";
import "./styles.css";

class Chip extends React.Component {
  handleRoverChange = e => {
    this.props.onRoverChange(e.target.value);
  };

  render() {
    return (
      <button
        className={`chip ${this.props.selected ? "selected" : ""}`}
        value={this.props.name}
        onClick={this.handleRoverChange}
      >
        {this.props.name}
      </button>
    );
  }
}

export default Chip;
