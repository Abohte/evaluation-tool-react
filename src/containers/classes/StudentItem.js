// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import EditStudentButton from '../../components/classes/EditStudentButton'
import DeleteStudentButton from '../../components/classes/DeleteStudentButton'
import colors from '../../components/UI/Colors.js'
import './Classes.css'

class ClassItem extends PureComponent {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired,
    classId: PropTypes.string.isRequired
  }

  renderEvaluation = (evaluation, index) => {
    const date = new Date(evaluation.date)
    return (
        <div key={index} className="chip">
          <Chip>
          <Avatar size={32} backgroundColor={colors(evaluation.evaluation)}/>
            {date.toLocaleDateString()}
          </Chip>
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
    const { _id, firstName, lastName, photo, evaluations } = this.props

    return (

      <Card>
        <CardHeader
          title={`${firstName} ${lastName}`}
          subtitle={this.getLastEvaluation(evaluations)}
          subtitleStyle={this.getLastEvaluationColor(evaluations)}
          avatar={photo}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <div className="wrapper">
            {evaluations.map(this.renderEvaluation)}
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

export default connect(null, { push })(ClassItem)
