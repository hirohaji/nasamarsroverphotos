import React, { Component } from "react";

import "./styles.css";

export default class Photo extends Component {
  render() {
    return (
      <div className="main-about">
        <article>
          <h1>Mars Rover Photos</h1>
          <p>
            This is a project in React.js to consume a NASA API providing images
            gathered by the rovers Perseverance, Curiosity, Opportunity, and Spirit on Mars. Their
            objective with the open APIs is to make data more easily available
            to other developers, educators, and citizen scientists.
          </p>
          <p className="signature">Feel free to contact me,<br/>Hiroshi Haji</p>
          <div className="about-links">
            <div className="about-element">
              GitHub code
              <a
                href="https://github.com/hirohaji/nasamarsroverphotos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="img git-img" alt="GitHub logo" />
              </a>
            </div>
            <div className="about-element">
              NASA open APIs
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="img nasa-img" alt="NASA logo" />
              </a>
            </div>
            <div className="about-element">
              NASA Mars project
              <a
                href="https://mars.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="img nasa-img" alt="GitHub logo" />
              </a>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
