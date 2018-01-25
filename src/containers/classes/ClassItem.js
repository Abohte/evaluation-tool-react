// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import colors from '../../components/UI/Colors.js'
import './Classes.css'

class ClassItem extends PureComponent {
  static propTypes = {
    batchNumber: PropTypes.number.isRequired,
    startsAt: PropTypes.string.isRequired,
    endsAt: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired
  }

  renderStudent = (student, index) => {
    const studentName = `${student.firstName} ${student.lastName}`
    const color = colors(student.evaluations.length > 0 ? student.evaluations[0].evaluation : null)
    return (
        <div key={index} className="chip">
          <Chip>
          <Avatar size={32} backgroundColor={color}/>
            {studentName}
          </Chip>
        </div>
    )
  }

  render() {
    const { _id, batchNumber, startsAt, endsAt, students } = this.props
    const startDate = new Date(startsAt)
    const endDate = new Date(endsAt)

    return (

      <Card>
        <CardHeader
          title={`Batch ${batchNumber}`}
          subtitle={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} • ${students.length} students`}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <div className="wrapper">
            {students.map(this.renderStudent)}
          </div>
        </CardText>
        <CardActions>
          <FlatButton
            onClick={ () => this.props.push(`/class/${_id}`) }
            label="go to class" />
        </CardActions>
      </Card>
    )

  }
}

export default connect(null, { push })(ClassItem)
