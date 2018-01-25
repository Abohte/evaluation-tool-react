// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import '../../containers/classes/Classes.css'

class EvaluationBar extends PureComponent {
  static propTypes = {
    evaluations: PropTypes.array.isRequired,
  }

  evaluationsByColor = (evaluations, color) => {
    return evaluations.filter(evaluation => evaluation === color)
  }

  evaluationPercentage = (evaluations, color) => {
    const evaluationsNumber = this.evaluationsByColor(evaluations, color).length
    const evaluationPercentage = (evaluationsNumber/evaluations.length)*100
    return (evaluationPercentage === 0 ? null : `${evaluationPercentage}%`)
  }

  render() {
    const { evaluations } = this.props
    const redPercentage = this.evaluationPercentage(evaluations, "red")
    const yellowPercentage = this.evaluationPercentage(evaluations, "yellow")
    const greenPercentage = this.evaluationPercentage(evaluations, "green")
    const restPercentage = this.evaluationPercentage(evaluations, null)

    return (
      <div className="evaluation-bar">
        <div className="evaluation red" style={{width: `${redPercentage}`}} >
          {redPercentage}
        </div>
        <div className="evaluation evaluation-yellow" style={{width: `${yellowPercentage}`}}>
          {yellowPercentage}
        </div>
        <div className="evaluation evaluation-green" style={{width: `${greenPercentage}`}}>
          {greenPercentage}
        </div>
        <div className="evaluation evaluation-missing" style={{width: `${restPercentage}`}}>
          {restPercentage}
        </div>
      </div>

    )

  }
}

export default (EvaluationBar)
