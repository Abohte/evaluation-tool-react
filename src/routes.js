// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  SignIn,
  SignUp,
  ClassOverview,
  ClassPage,
} from './containers'

export default class Routes extends Component {

  //TODO: Does it make sense to have classes on "/" or make "/" redirect to sign-in or classes?
  //TODO: Update routes for creating / viewing a class

  render() {
    return (
      <div>
        <Route exact path="/" component={ClassOverview} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/class/:classId" component={ClassPage} />
        <Route path="/classes" component={ClassOverview} />
      </div>
    )
  }
}
