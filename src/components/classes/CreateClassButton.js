// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import DatePicker from 'material-ui/DatePicker'
import createClass from '../../actions/classes/create'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class CreateClassButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
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
      startDate: null,
      endDate: null,
    })
  }

  // checkValid = () => {
  //   console.log(this.refs.batchNumber.value )
  //   return !(this.state.startDate !== null && this.state.endDate !== null && this.refs.batchNumber.value !== null)
  // }

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

  submitForm(event) {
    event.preventDefault()
    const aClass = {
      batchNumber: this.refs.batchNumber.getValue(),
      startsAt: this.state.startDate,
      endsAt: this.state.endDate,
    }
    this.props.createClass(aClass)
    this.handleClose()
  }

  render() {
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
              <TextField ref="batchNumber" type="number" hintText="Batch Number" />
            </div>
            <div className="input">
              <DatePicker
                onChange={this.handleChangeStartDate}
                autoOk={true}
                floatingLabelText="Start Date"
                defaultDate={this.state.startDate}
              />
              <DatePicker
                onChange={this.handleChangeEndDate}
                autoOk={true}
                floatingLabelText="End Date"
                defaultDate={this.state.endDate}
              />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createClass
}

export default connect(null, mapDispatchToProps)(CreateClassButton)
