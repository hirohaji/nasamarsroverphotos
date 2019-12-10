import React from "react";
import Chip from "../Chip";

import "./styles.css";

class RoverChips extends React.Component {
  rovers = ["curiosity", "opportunity", "spirit"];

  render() {
    return (
      <div className="rover-chips-bar">
        {this.rovers.map((rover, i) => {
          return (
            <Chip
              key={i}
              name={rover}
              selected={ this.props.rover == rover }
              onRoverChange={this.props.onRoverChange}
            />
          );
        })}
      </div>
    );
  }
}

export default RoverChips;
