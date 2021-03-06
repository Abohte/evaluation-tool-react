import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import Snackbar from 'material-ui/Snackbar'
import { fetchOneClass } from '../../actions/classes/fetch'
import StudentItem from './StudentItem'
import CreateStudentButton from '../../components/classes/CreateStudentButton'
import EvaluationBar from '../../components/classes/EvaluationBar'
import AskQuestionButton from '../../components/classes/AskQuestionButton'
import './Classes.css'

class ClassPage extends PureComponent {
  static propTypes = {
    // students: PropTypes.array.isRequired,
    // _id: PropTypes.string.isRequired,
    // batchNumber: PropTypes.number.isRequired,
    fetchOneClass: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      toEvaluate: undefined
    }
  }

  componentWillMount() {
    const { replace, signedIn, fetchOneClass } = this.props
    signedIn ? fetchOneClass(this.props.match.params.classId) : replace('/sign-in')
  }

  renderStudentItem = (student, index) => {
    return <StudentItem
      classId={this.props._id}
      key={index}
      addEvaluation={(index === this.state.toEvaluate)}
      {...student}
      onNext={() => this.onNext(index)}/>
  }

  onNext(index) {
    if (index+1 >= this.props.students.length) this.setState({ open: true })
    this.setState({toEvaluate: index+1})
  }

  lastEvaluations = (students) => {
    return students.map(this.getLastEvaluationColor)
  }

  studentsWithLastEvaluation = (students) => {
    return students.map(student => ({
      studentName: student.firstName + " " + student.lastName,
      lastEvaluation: this.getLastEvaluationColor(student)
    }))
  }

  getLastEvaluationColor = (student) => {
    if (student.evaluations.length === 0) return null
    const lastEvaluation = student.evaluations.reduce((evaluation, mostRecentEvaluation) => {
      return new Date(evaluation.date) > new Date(mostRecentEvaluation.date) ? evaluation : mostRecentEvaluation
    })
    return lastEvaluation.evaluation
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { _id, batchNumber, students } = this.props
    if (!_id) return null

    return (
      <div className="Classes">
        <header>
          <h1>Batch {batchNumber}</h1>
          <EvaluationBar evaluations={this.lastEvaluations(students)} />
          <AskQuestionButton students={this.studentsWithLastEvaluation(students)}/>
        </header>
        <main>
          {this.props.students.map(this.renderStudentItem)}
        </main>
        <footer>
          <CreateStudentButton classId={_id}/>
        </footer>
        <Snackbar
          open={this.state.open}
          message="Last student evaluated"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose} />
      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }, { match }) => {
  const aClass = classes.reduce((prev, next) => {
    if (next._id === match.params.classId) {
      return next
    }
    return prev
  }, {})

  return {
    ...aClass,
    signedIn: !!currentUser && !!currentUser._id
  }
}

export default connect(mapStateToProps, { fetchOneClass, replace })(ClassPage)
