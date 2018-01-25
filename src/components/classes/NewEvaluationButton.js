import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import ActionSelected from 'material-ui/svg-icons/image/lens';
import ActionUnselected from 'material-ui/svg-icons/image/panorama-fish-eye';
import Chip from 'material-ui/Chip'
import colors from '../../components/UI/Colors.js'
import '../../containers/classes/Classes.css'

class NewEvaluationButton extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired
  }

  state = {
    open: false,
    date: undefined,
  }

  handleClick = (color) => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      date: undefined,
    })
  }

  handleChangeDate = (event, date) => {
    this.setState({
      date: date,
    })
  }

  submitForm(event) {
    event.preventDefault()
    // const aClass = {
    //   batchNumber: this.refs.batchNumber.getValue(),
    //   startsAt: this.state.startDate,
    //   endsAt: this.state.endDate,
    // }
    // this.props.createClass(aClass)
    this.handleClose()
  }

  disableUsedDates = (date) => {
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
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.submitForm.bind(this)}
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
          title="New evaluation"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <RadioButtonGroup className="radio-buttons" name="shipSpeed" defaultSelected={color} >
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
                defaultDate={this.state.date}
                shouldDisableDate={this.disableUsedDates}
              />
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

export default (NewEvaluationButton)
