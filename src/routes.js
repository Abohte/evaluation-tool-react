// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Classes,
  Game,
  SignIn,
  SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Classes} />
        <Route path="/play/:gameId" component={Game} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
