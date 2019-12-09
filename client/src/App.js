import React from "react";
import Routes from "./routes";

import "./styles.css";

import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";

const App = () => (
  <div className="App">
    <Header />
    <NavigationBar />
    <Routes />
  </div>
);

export default App;
