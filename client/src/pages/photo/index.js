import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Photo extends Component {
  render() {
    const { photo } = this.props.location.state;
    return (
      <div className="photo-info">
        <h1>
          {photo.rover.name} - Photo #{photo.id}
        </h1>
        <a href={photo.img_src}>
          <img src={photo.img_src} alt={photo.camera.full_name} />
        </a>
        <p>Taken on Mars day: {photo.sol}</p>
        <p>Date on Earth: {photo.earth_date}</p>
        <p>from: {photo.camera.full_name}</p>
        <br />
        <h3>Rover info</h3>
        <p>Status: {photo.rover.status}</p>
        <p>Launch date: {photo.rover.launch_date}</p>
        <p>Landing date: {photo.rover.landing_date}</p>
        <Link className="button" to={`/`}>Voltar</Link>
      </div>
    );
  }
}
