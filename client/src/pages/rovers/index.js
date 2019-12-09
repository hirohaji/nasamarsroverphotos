import React, { Component } from "react";
import Loading from "../../components/Loading";

import "./styles.css";
import {displayDate} from "../../components/Date"

export default class Rovers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rovers: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/rovers`)
      .then(response => {
        response.json().then(responseJson => {
          this.setState({
            rovers: responseJson.rovers,
            isLoading: false
          });
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="rover-main">
        <h1>Rovers</h1>
        {this.state.isLoading && <Loading />}
        {this.state.rovers.map(rover => {
          return (
            <article key={rover.id}>
              <h1>Rover {rover.name}</h1>
              <br />
              Status: {rover.status}
              <br />
              Launch Date: {displayDate(rover.launch_date)}
              <br />
              Landing Date: {displayDate(rover.landing_date)}
              <br />
              Total photos:{" "}
              {new Intl.NumberFormat("pt-BR").format(rover.total_photos)}
              <br />
              Cameras:
              <ul>
                {rover.cameras.map(camera => {
                  return (
                    <li key={camera.name}>
                      {camera.name}: {camera.full_name}
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    );
  }
}
