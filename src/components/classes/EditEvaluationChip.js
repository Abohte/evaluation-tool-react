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
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import colors from '../../components/UI/Colors.js'
import editEvaluation from '../../actions/evaluations/edit'

class EditEvaluationChip extends PureComponent {
  static propTypes = {
    editEvaluation: PropTypes.func.isRequired,
    evaluation: PropTypes.shape({
      date: PropTypes.string.isRequired,
      remarks: PropTypes.string,
      evaluation: PropTypes.string.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      date: new Date(props.evaluation.date),
      evaluation: props.evaluation.evaluation
    }
  }

  handleClick = (color) => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleChangeValueSelected = (event, value) => {
    this.setState({
      evaluation: value,
    })
  }

  submitForm(event) {
    event.preventDefault()
    const evaluation = {
      remarks: this.refs.remarks.getValue(),
      date: this.state.date,
      evaluation: this.state.evaluation,
    }
    this.props.editEvaluation(evaluation, this.props.evaluation._id)
    this.handleClose()
  }

  usedDate = (date) => {
    return this.props.evaluationDates.some((evalDate) => {
      return ( date.getDate() === evalDate.getDate() &&
      date.getMonth() === evalDate.getMonth() &&
      date.getFullYear() === evalDate.getFullYear() )
    })
  }

  render() {
    const { evaluation } = this.props
    const date = new Date(evaluation.date)
    const color = evaluation.evaluation
    const today = new Date()
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
        onClick={this.submitForm.bind(this)}
      />,
    ]

    return (
      <div>
        <Chip onClick={this.handleClick}>
        <Avatar size={32} backgroundColor={colors(evaluation.evaluation)}/>
          {date.toLocaleDateString()}
        </Chip>
        <Dialog
          title="Edit evaluation"
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
                iconStyle={{height: "50px", width: "50px"}}
                checkedIcon={<ActionSelected style={{fill: `${colors("red")}`}} />}
                uncheckedIcon={<ActionUnselected style={{fill: `${colors("red")}`}} />}
              />
              <RadioButton
                className="radio-button"
                value="yellow"
                iconStyle={{height: "50px", width: "50px"}}
                checkedIcon={<ActionSelected style={{fill: `${colors("yellow")}`}} />}
                uncheckedIcon={<ActionUnselected style={{fill: `${colors("yellow")}`}} />}
              />
              <RadioButton
                className="radio-button"
                value="green"
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
                defaultDate={date}
                shouldDisableDate={this.usedDate}
                maxDate={today}
              />
            </div>
            <div className="input">
              <TextField
                ref="remarks"
                type="text"
                hintText="Remarks (optional)"
                defaultValue={evaluation.remarks}
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

export default connect(null, { editEvaluation })(EditEvaluationChip)
