// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import createClass from '../../actions/classes/create'

class CreateClassButton extends PureComponent {
  static propTypes = {
    createClass: PropTypes.func.isRequired,
    batchNumbers: PropTypes.array.isRequired
  }

  state = {
    open: false,
    startDate: undefined,
    endDate: undefined,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      batchNumber: undefined,
      startDate: undefined,
      endDate: undefined,
      batchNumberError: undefined,
      startDateError: undefined,
      endDateError: undefined
    })
  }

  validateBatchNumber() {
    const { batchNumber } = this.state
    const { batchNumbers } = this.props
    console.log(batchNumbers)
    console.log(batchNumber)
    const batchnrtaken = batchNumbers.some((batchNo) => {
      debugger
      Number(batchNo) === Number(batchNumber)
    })
    console.log(batchNumbers.some(batchNo => Number(batchNo) === Number(batchNumber)))

    if (batchNumbers.some(batchNo => batchNo == batchNumber)) {
      this.setState({
        batchNumberError: "This batchNumber already exists"
      })
      return false
    }

    if (batchNumber) {
      this.setState({
        batchNumberError: null
      })
      return true
    }

    this.setState({
      batchNumberError: "Please provide a batchNumber"
    })
    return false
  }

  validateStartDate() {
    const { startDate } = this.state

    if (startDate) {
      this.setState({
        startDateError: null
      })
      return true
    }

    this.setState({
      startDateError: "Please provide a start date"
    })
    return false
  }

  validateEndDate() {
    const { endDate, startDate } = this.state

    if (!endDate) {
      this.setState({
        endDateError: "Please provide an end date"
      })
      return false
    }

    if (endDate <= startDate) {
      this.setState({
        endDateError: "Please provide a valid end date"
      })
      return false
    }

    this.setState({
      endDateError: null
    })
    return true

  }

  validateAll() {
    return this.validateBatchNumber() &&
      this.validateStartDate() &&
      this.validateEndDate()
  }

  handleChangeStartDate = (event, date) => {
    this.setState({
      startDate: date,
    })
  }

  handleChangeEndDate = (event, date) => {
    this.setState({
      endDate: date,
    })
  }

  handleChangeBatchNumber = (event, batchNumber) => {
    this.setState({
      batchNumber: batchNumber,
    })
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const aClass = {
        batchNumber: this.state.batchNumber,
        startsAt: this.state.startDate,
        endsAt: this.state.endDate,
      }
      this.props.createClass(aClass)
      this.handleClose()
    }
    return false
  }

  render() {
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
        onClick={this.submitForm.bind(this)}
      />,
    ]

    return (
      <div>
        <div className="CreateClassButton">
          <FloatingActionButton
            onClick={this.handleClickOpen} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Dialog
          title="Create class"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <div className="input">
              <TextField ref="batchNumber" type="number" hintText="Batch Number"
              onChange={this.handleChangeBatchNumber}
              errorText={this.state.batchNumberError} />
            </div>
            <div className="input">
              <DatePicker
                onChange={this.handleChangeStartDate}
                autoOk={true}
                floatingLabelText="Start Date"
                defaultDate={this.state.startDate}
                errorText={this.state.startDateError} />
              <DatePicker
                onChange={this.handleChangeEndDate}
                autoOk={true}
                floatingLabelText="End Date"
                defaultDate={this.state.endDate}
                errorText={this.state.endDateError} />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { createClass })(CreateClassButton)
