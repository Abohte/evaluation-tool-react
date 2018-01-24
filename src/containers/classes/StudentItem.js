// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import removeStudent from '../../actions/students/delete'
import './Classes.css'

class ClassItem extends PureComponent {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    evaluations: PropTypes.array.isRequired,
    classId: PropTypes.string.isRequired
  }

  state = {
    open: false,
  };

  renderEvaluation = (evaluation, index) => {
    const date = new Date(evaluation.date)
    return (
        <div key={index} className="chip">
          <Chip>
          <Avatar size={32} backgroundColor={evaluation.evaluation}/>
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
    return {borderBottom: `4px solid ${evaluations[0].evaluation}`}
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  submitDelete(event) {
    event.preventDefault()
    this.props.removeStudent(this.props._id, this.props.classId)
    this.handleClose()
  }

  render() {
    const { _id, firstName, lastName, photo, evaluations } = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.submitDelete.bind(this)}
      />,
    ];

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
          <FloatingActionButton mini={true} >
            <ContentEdit />
          </FloatingActionButton>

          <FloatingActionButton mini={true} onClick={this.handleClickOpen}>
            <ContentClear />
          </FloatingActionButton>
          <Dialog
            title="Remove student"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          </Dialog>
        </div>
        </CardActions>
      </Card>
    )

  }
}

export default connect(null, { removeStudent, push })(ClassItem)
