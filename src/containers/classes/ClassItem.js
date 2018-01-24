// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
// import './ClassItem.css'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class ClassItem extends PureComponent {
  static propTypes = {
    batchNumber: PropTypes.number.isRequired,
    startsAt: PropTypes.string.isRequired,
    endsAt: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired
  }

  renderStudent = (student, index) => {
    const studentName = `${student.firstName} ${student.lastName}`
    const color = student.evaluations.length > 0 ? student.evaluations[0].evaluation : "grey"
    return (
         <Chip key={index} style={styles.chip}>
         <Avatar size={32} backgroundColor={color}/>
           {studentName}
         </Chip>
    )
  }

  render() {
    const { batchNumber, startsAt, endsAt, students } = this.props

    return (

      <Card>
        <CardHeader
          title={`Batch ${batchNumber}`}
          subtitle={`${startsAt}-${endsAt} • ${students.length} students`}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <div style={styles.wrapper}>
            {students.map(this.renderStudent)}
          </div>
        </CardText>
        <CardActions>
          <FlatButton label="go to class" />
        </CardActions>
      </Card>
    )




  }
}

export default (ClassItem)
