import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Photo from "./pages/photo";
import Rovers from "./pages/rovers";
import About from "./pages/about";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/photo" component={Photo} />
      <Route path="/rovers" component={Rovers} />
      <Route path="/about" component={About} />
      <Route path="/" component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
