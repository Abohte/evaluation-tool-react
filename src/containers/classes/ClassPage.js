// src/containers/classes/ViewClass.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneClass } from '../../actions/classes/fetch'
import StudentItem from './StudentItem'
import CreateStudentButton from '../../components/classes/CreateStudentButton'
import './Classes.css'

class ClassPage extends PureComponent {

  //TODO: Fetch information for a class and display

  componentWillMount() {
    this.props.fetchOneClass(this.props.match.params.classId)
  }

  renderStudentItem = (student, index) => {
    return <StudentItem classId={this.props._id} key={index} {...student}/>
  }

  render() {
    const { _id, batchNumber } = this.props
    if (!_id) return null

    return (
      <div className="Classes">
        <h1>Batch {batchNumber}</h1>
        <main>
          {this.props.students.map(this.renderStudentItem)}
        </main>
        <footer>
          <CreateStudentButton classId={_id}/>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = ({ classes }, { match }) => {
  const aClass = classes.reduce((prev, next) => {
    if (next._id === match.params.classId) {
      return next
    }
    return prev
  }, {})

  return {
    ...aClass
  }
}

export default connect(mapStateToProps, { fetchOneClass })(ClassPage)
