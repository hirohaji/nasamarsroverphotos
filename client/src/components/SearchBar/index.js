import React from "react";
import "./styles.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldRover: this.props.rover,
      fieldSol: this.props.sol,
      fieldEarthDate: this.props.earthDate,
      searchBySol: this.props.searchBySol,
      fieldCamera: this.props.camera
    }
  }

  
  handleRoverChange = e => {
    this.setState({fieldRover: e.target.value})
    //this.props.onRoverChange(e.target.value);
  };
  
  handleSolChange = e => {
    this.setState({
      fieldSol: e.target.value,
      searchBySol: true
    })
    //this.props.onSolChange(e.target.value);
  };

  handleEarthDateChange = e => {
    this.setState({
      fieldEarthDate: e.target.value,
      searchBySol: false
    })
    //this.props.onSolChange(e.target.value);
  };
  
  handleCameraChange = e => {
    this.setState({fieldCamera: e.target.value})
    //this.props.onCameraChange(e.target.value);
  };
  
  handleSubmit = e => {
    this.updateState();
    e.preventDefault();
  };

  updateState = () => {
    this.props.onRoverChange(this.state.fieldRover);
    this.props.onSolChange(this.state.fieldSol);
    this.props.onEarthDateChange(this.state.fieldEarthDate);
    this.props.onSearchBySolChange(this.state.searchBySol);
    this.props.onCameraChange(this.state.fieldCamera);
  }

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <select onChange={this.handleRoverChange}>
            <option value="perseverance">Perseverance</option>
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
          <label htmlFor="earthDate">Earth date</label>
          <input 
           className="inputDate" 
           id="earthDate" 
           type="date" 
           defaultValue={this.props.earthDate} 
           onChange={this.handleEarthDateChange}
          />
        </div>
        <div className="input-container">
          <select
            disabled
            defaultValue={this.props.camera}
            onChange={this.handleCameraChange}
          >
            <option value="ALL">All</option>
            <option value="FHAZ">FHAZ</option>
            <option value="RHAZ">RHAZ</option>
            <option value="MAST">MAST</option>
          </select>
        </div>
        <div className="input-container">
          <button onClick={this.updateState}>
            <span>Search</span>
          </button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
