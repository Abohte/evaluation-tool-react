// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  SignIn,
  SignUp,
  Classes,
  ViewClass,
  CreateClass
} from './containers'

export default class Routes extends Component {

  //TODO: Does it make sense to have classes on "/" or make "/" redirect to sign-in or classes?
  //TODO: Update routes for creating / viewing a class

  render() {
    return (
      <div>
        <Route exact path="/" component={Classes} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/classes" component={Classes} />
        <Route path="/classes/create" component={CreateClass} />
        <Route path="/classes/view" component={ViewClass} />
      </div>
    )
  }
}
