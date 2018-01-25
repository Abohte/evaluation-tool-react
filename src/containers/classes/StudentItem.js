import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import EditStudentButton from '../../components/classes/EditStudentButton'
import DeleteStudentButton from '../../components/classes/DeleteStudentButton'
import CreateEvaluationButton from '../../components/classes/CreateEvaluationButton'
import EditEvaluationChip from '../../components/classes/EditEvaluationChip'
import colors from '../../components/UI/Colors.js'
import './Classes.css'

class ClassItem extends PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired,
    classId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    addEvaluation: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: props.addEvaluation || false,
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.addEvaluation) this.setState({ expanded: true})
  }

  onNext = () => {
    this.setState({ expanded: false })
    this.props.onNext()
  }

  renderEvaluation = (evaluation, evaluationDates, index) => {
    return (
      <div key={index} className="chip">
        <EditEvaluationChip evaluation={evaluation} evaluationDates={evaluationDates} disabled={this.props.userId !== evaluation.userId} />
      </div>
    )
  }

  getLastEvaluation = (evaluations) => {
    if (evaluations.length === 0) return "Not yet evaluated"
    const date = (new Date(evaluations[0].date)).toLocaleDateString()
    return evaluations[0].remarks ?
      `Evaluated ${date} : ${evaluations[0].remarks}` :
      `Evaluated ${date}`
  }

  getLastEvaluationColor = (evaluations) => {
    if (evaluations.length === 0) return null
    const color = colors(evaluations[0].evaluation)
    return {borderBottom: `4px solid ${color}`}
  }

  render() {
    const { _id, firstName, lastName, photo } = this.props
    const evaluations = this.props.evaluations.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1
      if (new Date(a.date) < new Date(b.date)) return 1
      else return 0
    })
    const evaluationDates = evaluations.map((evaluation) => new Date(evaluation.date))

    return (

      <Card expanded={this.state.expanded} onExpandChange={(expanded) => this.setState({expanded})}>
        <CardHeader
          title={`${firstName} ${lastName}`}
          subtitle={this.getLastEvaluation(evaluations)}
          subtitleStyle={this.getLastEvaluationColor(evaluations)}
          avatar={photo}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <div className="evaluation-buttons">
            <CreateEvaluationButton evaluationDates={evaluationDates} color="red" student={{ ...this.props }} onNext={this.onNext} />
            <CreateEvaluationButton evaluationDates={evaluationDates} color="yellow" student={{ ...this.props }} onNext={this.onNext} />
            <CreateEvaluationButton evaluationDates={evaluationDates} color="green" student={{ ...this.props }} startOpen={this.props.addEvaluation} onNext={this.onNext} />
          </div>
          <div className="wrapper">
            {evaluations.map((evaluation, index) => this.renderEvaluation(evaluation, evaluationDates, index))}
          </div>
        </CardText>
        <CardActions>
          <div className="edit-buttons">
            <EditStudentButton { ...this.props }/>
            <DeleteStudentButton studentId={_id}/>
          </div>
        </CardActions>
      </Card>
    )

  }
}

const mapStateToProps = ({ currentUser }) => ({
  userId: currentUser._id,
})

export default connect(mapStateToProps)(ClassItem)
