import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Admin from "./Admin"
import registerServiceWorker from "./registerServiceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/admin/" component={Admin} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
