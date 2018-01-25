import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import colors from '../../components/UI/Colors.js'
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

    if (evaluations.length === 0) return (
      <div className="evaluation-bar">
        <div className="evaluation" style={{width: "100%"}} >
        no students to evaluate
        </div>
      </div>
    )

    return (
      <div className="evaluation-bar">
        <div className="evaluation" style={{width: `${redPercentage}`, backgroundColor: `${colors("red")}`}} >
          {redPercentage}
        </div>
        <div className="evaluation" style={{width: `${yellowPercentage}`, backgroundColor: `${colors("yellow")}`}}>
          {yellowPercentage}
        </div>
        <div className="evaluation" style={{width: `${greenPercentage}`, backgroundColor: `${colors("green")}`}}>
          {greenPercentage}
        </div>
        <div className="evaluation" style={{width: `${restPercentage}`, backgroundColor: `${colors(null)}`}}>
          {restPercentage}
        </div>
      </div>

    )

  }
}

export default (EvaluationBar)
