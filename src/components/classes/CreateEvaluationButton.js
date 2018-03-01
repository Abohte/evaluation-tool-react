import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import ActionSelected from 'material-ui/svg-icons/image/lens'
import ActionUnselected from 'material-ui/svg-icons/image/panorama-fish-eye'
import Chip from 'material-ui/Chip'
import colors from '../../components/UI/Colors.js'
import createEvaluation from '../../actions/evaluations/create'
import '../../containers/classes/Classes.css'

class CreateEvaluationButton extends PureComponent {
  static propTypes = {
    startOpen: PropTypes.bool,
    onNext: PropTypes.func.isRequired,
    createEvaluation: PropTypes.func.isRequired,
    student: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    color: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: props.startOpen || false,
      date: this.usedDate(new Date()) ? undefined : new Date(),
      evaluation: props.color || "green"
    }
  }

  handleClick = (color) => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      date: undefined,
      dateError: undefined
    })
  }

  handleChangeDate = (event, date) => {
    this.setState({
      date: date,
    })
  }

  handleChangeValueSelected = (event, value) => {
    this.setState({
      evaluation: value,
    })
  }

  validateDate() {
    const { date } = this.state

    if (date) {
      this.setState({
        dateError: null
      })
      return true
    }

    this.setState({
      dateError: "Please provide a date"
    })
    return false
  }

  submitForm(next, event) {
    event.preventDefault()
    if (this.validateDate()) {
      const evaluation = {
        remarks: this.refs.remarks.getValue(),
        date: this.state.date,
        evaluation: this.state.evaluation,
      }
      this.props.createEvaluation(evaluation, this.props.student._id)
      this.handleClose()
      if (next) this.props.onNext()
    }
    return false
  }

  usedDate = (date) => {
    return this.props.evaluationDates.some((evalDate) => {
      return ( date.getDate() === evalDate.getDate() &&
      date.getMonth() === evalDate.getMonth() &&
      date.getFullYear() === evalDate.getFullYear() )
    })
  }

  render() {
    const color = this.props.color
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        disabled={false}
        onClick={this.submitForm.bind(this, false)}
      />,
      <FlatButton
        label="Save and Next"
        primary={true}
        disabled={false}
        onClick={this.submitForm.bind(this, true)}
      />,
    ]

    return (
      <div className="chip evaluation-chip">
        <Chip
        backgroundColor={colors(color)}
        onClick={() => this.handleClick(color)}>
          +
        </Chip>
        <Dialog
          title={`Evaluate ${this.props.student.firstName} ${this.props.student.lastName}`}
          actions={actions}
          modal={true}
          open={this.state.open} >
          <form>
            <RadioButtonGroup
              className="radio-buttons"
              ref="evaluation"
              name="evaluation"
              defaultSelected={color}
              onChange={this.handleChangeValueSelected} >
              <RadioButton
                className="radio-button"
                value="red"
                width="100px"
                iconStyle={{height: "50px", width: "50px"}}
                checkedIcon={<ActionSelected style={{fill: `${colors("red")}`}} />}
                uncheckedIcon={<ActionUnselected style={{fill: `${colors("red")}`}} />}
              />
              <RadioButton
                className="radio-button"
                value="yellow"
                width="100px"
                iconStyle={{height: "50px", width: "50px"}}
                checkedIcon={<ActionSelected style={{fill: `${colors("yellow")}`}} />}
                uncheckedIcon={<ActionUnselected style={{fill: `${colors("yellow")}`}} />}
              />
              <RadioButton
                className="radio-button"
                value="green"
                width="100px"
                iconStyle={{height: "50px", width: "50px"}}
                checkedIcon={<ActionSelected style={{fill: `${colors("green")}`}} />}
                uncheckedIcon={<ActionUnselected style={{fill: `${colors("green")}`}} />}
              />
            </RadioButtonGroup>
            <div className="input">
              <DatePicker
                onChange={this.handleChangeDate}
                autoOk={true}
                floatingLabelText="Evaluated Date"
                shouldDisableDate={this.usedDate}
                defaultDate={this.state.date}
                maxDate={new Date()}
                errorText={this.state.dateError} />
            </div>
            <div className="input">
              <TextField
                ref="remarks"
                type="text"
                hintText="Remarks (optional)"
                fullWidth={true}
                multiLine={true}
                rows={1}
                rowsMax={6}/>
            </div>
          </form>
        </Dialog>
      </div>

    )
  }
}

export default connect(null, { createEvaluation })(CreateEvaluationButton)
