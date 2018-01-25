// src/containers/classes/ViewClass.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneClass } from '../../actions/classes/fetch'
import StudentItem from './StudentItem'
import CreateStudentButton from '../../components/classes/CreateStudentButton'
import EvaluationBar from '../../components/classes/EvaluationBar'
import './Classes.css'

class ClassPage extends PureComponent {

  componentWillMount() {
    this.props.fetchOneClass(this.props.match.params.classId)
  }

  renderStudentItem = (student, index) => {
    return <StudentItem classId={this.props._id} key={index} {...student}/>
  }

  studentEvaluations = (students) => {
    return students.map(this.getLastEvaluationColor)
  }

  getLastEvaluationColor = (student) => {
    if (student.evaluations.length === 0) return null
    return student.evaluations[0].evaluation
  }


  render() {
    const { _id, batchNumber, students } = this.props
    if (!_id) return null

    console.log(this.studentEvaluations(students))

    return (
      <div className="Classes">
        <header>
          <h1>Batch {batchNumber}</h1>
          <EvaluationBar evaluations={this.studentEvaluations(students)} />
        </header>
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
