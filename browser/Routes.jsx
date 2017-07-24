import React from "react";
import { Switch, Route } from "react-router-dom";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import SingleItem from "./components/SingleItem.jsx";

const Container = props => (
  <Root {...props}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:name" component={SingleItem} />
    </Switch>
  </Root>
);

const Routes = () => (
  <Route path="/" component={Container} />
);

export default Routes;
