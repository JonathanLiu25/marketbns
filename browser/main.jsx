import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "./store";
import Routes from "./Routes";

render(
  <Provider store={store} >
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("main")
);
