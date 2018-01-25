// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import '../../containers/classes/Classes.css'

class AskQuestionButton extends PureComponent {
  state = {
    open: false,
    studentName: undefined,
  }
  static propTypes = {
    students: PropTypes.array.isRequired,
  }
  //
  // evaluationsByColor = (evaluations, color) => {
  //   return evaluations.filter(evaluation => evaluation === color)
  // }
  //
  // evaluationPercentage = (evaluations, color) => {
  //   const evaluationsNumber = this.evaluationsByColor(evaluations, color).length
  //   const evaluationPercentage = (evaluationsNumber/evaluations.length)*100
  //   return (evaluationPercentage === 0 ? null : `${evaluationPercentage}%`)
  // }

  handleClickOpen = () => {
    this.setState({
      open: true,
      studentName: this.selectStudent()
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      startDate: null,
      endDate: null,
    })
  }

  selectStudent = () => {
    if (this.props.students.length === 0) return "No students in this class"
    var randomNumber = Math.floor(Math.random() * 100)
    let students = []
    switch (true) {
      case (randomNumber < 47) :
        students = this.studentsByEvaluationColor("red")
        break
      case (randomNumber < 79) :
        students = this.studentsByEvaluationColor("yellow")
        break
      default:
        students = this.studentsByEvaluationColor("green").concat(this.studentsByEvaluationColor(null))
    }

    // retry in case there are students, but a color is selected which has no students
    return (students.length > 0 ? this.getRandomStudent(students) : this.selectStudent())
  }

  studentsByEvaluationColor = (color) => {
    return this.props.students.filter(student => student.lastEvaluation === color)
  }

  getRandomStudent = (students) => {
    return students[Math.floor(Math.random() * students.length)].studentName
  }

  render() {
    console.log(this.props.students)
    const actions = [
      <FlatButton
        label="Back"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <RaisedButton
          className="question-button"
          label="Ask question"
          onClick={this.handleClickOpen}
          secondary={true}/>
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <p className="selected-student">{this.state.studentName}</p>
        </Dialog>
      </div>

    )

  }
}

export default (AskQuestionButton)
