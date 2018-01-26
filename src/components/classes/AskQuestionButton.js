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
    students: PropTypes.array.isRequired
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      studentName: this.selectStudent(Math.floor(Math.random() * 100))
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  selectStudent = (randomNumber) => {
    if (this.props.students.length === 0) return "No students in this class"
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
    return (students.length > 0 ? this.getRandomStudent(students) : this.selectStudent(Math.floor(Math.random() * 100)))
  }

  studentsByEvaluationColor = (color) => {
    return this.props.students.filter(student => student.lastEvaluation === color)
  }

  getRandomStudent = (students) => {
    return students[Math.floor(Math.random() * students.length)].studentName
  }

  render() {
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
          disabled={this.props.students.length === 0}
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
