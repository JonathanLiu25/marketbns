import React from "react";
import { Switch, Route } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";

const Routes = () => (
  <Root>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Root>
);

export default Routes;
