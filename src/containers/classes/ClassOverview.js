// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import fetchClasses from '../../actions/classes/fetch'
import CreateClassButton from '../../components/classes/CreateClassButton'
import ClassItem from './ClassItem'
import './Classes.css'

class ClassOverview extends PureComponent {


  componentWillMount() {
    const { replace, signedIn, fetchClasses } = this.props
    signedIn ? fetchClasses() : replace('/sign-in')
  }

  renderClassItem = (aClass, index) => {
    return <ClassItem key={index} {...aClass}/>
  }

  render() {
    if (!this.props.signedIn) return null
    return (
      <div className="Classes">
        <h1>All classes</h1>
        <main>
          {this.props.classes.map(this.renderClassItem)}
        </main>
        <footer>
          <CreateClassButton />
        </footer>
      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }) => {
  return {
    ...classes,
    signedIn: !!currentUser && !!currentUser._id
  }
}


export default connect(mapStateToProps, { fetchClasses, replace })(ClassOverview)
