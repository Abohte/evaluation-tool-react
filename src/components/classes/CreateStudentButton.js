// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import createStudent from '../../actions/students/create'

class CreateStudentButton extends PureComponent {
  static propTypes = {
    classId: PropTypes.string.isRequired
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  // checkValid = () => {
  //   console.log(this.refs.batchNumber.value )
  //   return !(this.state.startDate !== null && this.state.endDate !== null && this.refs.batchNumber.value !== null)
  // }

  submitForm(event) {
    event.preventDefault()
    const student = {
      photo: this.refs.photo.getValue(),
      firstName: this.refs.firstName.getValue(),
      lastName: this.refs.lastName.getValue(),
    }
    this.props.createStudent(student, this.props.classId)
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
    ];

    return (
      <div>
        <div className="CreateStudentButton">
        <FloatingActionButton
          onClick={this.handleClickOpen} >
          <ContentAdd />
        </FloatingActionButton>
        </div>
        <Dialog
          title="Add student"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <div className="input">
              <TextField ref="firstName" type="text" hintText="First Name" fullWidth={true} />
            </div>
            <div className="input">
              <TextField ref="lastName" type="text" hintText="Last Name" fullWidth={true} />
            </div>
            <div className="input">
              <TextField ref="photo" type="url" hintText="Photo URL" fullWidth={true} />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createStudent
}

export default connect(null, mapDispatchToProps)(CreateStudentButton)
