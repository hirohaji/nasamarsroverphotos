import React from "react";
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleRoverChange = this.handleRoverChange.bind(this);
    this.handleSolChange = this.handleSolChange.bind(this);
    this.handleCameraChange = this.handleCameraChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRoverChange(e) {
    this.props.onRoverChange(e.target.value);
  }

  handleSolChange(e) {
    this.props.onSolChange(e.target.value);
  }

  handleCameraChange(e) {
    this.props.onCameraChange(e.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <select onChange={this.handleRoverChange}>
            <option value="curiousity">Curiousity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="sol">Day in Mars</label>
          <input 
            id="sol"
            type="text"
            defaultValue={this.props.sol}
            onChange={this.handleSolChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="date">Date</label>
          <input className="inputDate" id="date" type="date" disabled/>
        </div>
        <div className="input-container">
          <select disabled
            defaultValue={this.props.camera}
            onChange={this.handleCameraChange}
          >
            <option value="ALL">All</option>
            <option value="FHAZ">FHAZ</option>
            <option value="RHAZ">RHAZ</option>
            <option value="MAST">MAST</option>
          </select>
        </div>
      </form>
    );
  }
}

export default SearchBar;
