// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchClasses from '../../actions/classes/fetch'
import CreateClassButton from '../../components/classes/CreateClassButton'
import ClassItem from './ClassItem'
// import Paper from 'material-ui/Paper'
// import Menu from 'material-ui/Menu'
// import MenuItem from 'material-ui/MenuItem'
import './Classes.css'

class ClassOverview extends PureComponent {

  //TODO: Check if fetchClasses works
  //TODO: Display the classes fetched and add a link to ViewClass for each

  componentWillMount() {
    this.props.fetchClasses()
  }

  renderClassItem = (aClass, index) => {
    return <ClassItem key={index} {...aClass}/>
  }

  goToClass = classId => event => this.props.push(`/classes/${classId}`)

  render() {
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

const mapStateToProps = ({ classes }) => ({ classes })

export default connect(mapStateToProps, { fetchClasses, push })(ClassOverview)
