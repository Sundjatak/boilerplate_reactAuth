import React, { Component } from 'react';
import Header from '../containers/header';
import {Route, Switch} from 'react-router-dom';
import Home from './home';
import Ressources from './ressources';
// import TodoApp from "./todo-app"
import signinForm from "./signin"
import Signout from "./signout"
import Signup from "./signup"
import RequireAuthentification from '../helpers/require-authentification'
import Errors from './errors'
require("../style.css");

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Errors />
        <div className="container body_content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/ressources"
              component={RequireAuthentification(Ressources)}
              />
            <Route exact path="/signin" component={signinForm} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    )
  }
}
