import React from "react";

import "./styles.css";

const NavigationBar = () => (
  <div className="navigation" tabIndex="-1">
    <a className="button ButtonBase" tabIndex="0" href="/">
      <span className="ButtonLabel">Photos</span>
    </a>
    <a className="button ButtonBase" tabIndex="0" href="/rovers">
      <span className="ButtonLabel">Rovers</span>
    </a>
    <a className="button ButtonBase" tabIndex="0" href="/latest">
      <span className="ButtonLabel">Latest</span>
    </a>
    <a className="button ButtonBase" tabIndex="0" href="/about">
      <span className="ButtonLabel">About</span>
    </a>
  </div>
);

export default NavigationBar;
