// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClasses from '../actions/classes/fetch'
import CreateClassButton from '../components/classes/CreateClassButton'
// import Paper from 'material-ui/Paper'
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
import './Classes.css'

class Classes extends PureComponent {
  componentWillMount() {
    this.props.fetchClasses()
  }

  goToClass = classId => event => this.props.push(`/classes/${classId}`)

  render() {
    return (
      <div className="Classes">
        <h1>All classes</h1>
        <CreateClassButton />

      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }) => ({ classes, currentUser })

export default connect(mapStateToProps, { fetchClasses, push })(Classes)
