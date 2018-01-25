// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentEdit from 'material-ui/svg-icons/content/create'
import editStudent from '../../actions/students/edit'

class EditStudentButton extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }

  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      firstNameError: undefined,
      lastNameError: undefined,
      photoError: undefined
    })
  }

  validateFirstName() {
    const { firstName } = this.refs

    if (firstName.getValue().length > 1) {
      this.setState({
        firstNameError: null
      })
      return true
    }

    this.setState({
      firstNameError: "Please provide the student's first name"
    })
    return false
  }

  validateLastName() {
    const { lastName } = this.refs

    if (lastName.getValue().length > 1) {
      this.setState({
        lastNameError: null
      })
      return true
    }

    this.setState({
      lastNameError: "Please provide the student's last name"
    })
    return false
  }

  validatePhoto() {
    const { photo } = this.refs

    if (photo.getValue().length > 1) {
      this.setState({
        photoError: null
      })
      return true
    }

    this.setState({
      photoError: "Please provide a URL to the student's photo"
    })
    return false
  }

  validateAll() {
    return this.validateFirstName() &&
      this.validateLastName() &&
      this.validatePhoto()
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const student = {
        photo: this.refs.photo.getValue(),
        firstName: this.refs.firstName.getValue(),
        lastName: this.refs.lastName.getValue(),
      }
      this.props.editStudent(student, this.props._id)
      this.handleClose()
    }
    return false
  }

  render() {
    const { firstName, lastName, photo } = this.props

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
    ];

    return (
      <div>
        <div className="CreateStudentButton">
        <FloatingActionButton mini={true}
          onClick={this.handleClickOpen} >
          <ContentEdit />
        </FloatingActionButton>
        </div>
        <Dialog
          title="Edit student"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <div className="input">
              <TextField ref="firstName" type="text" hintText="First Name"
                defaultValue={firstName} fullWidth={true}
                onChange={this.validateFirstName.bind(this)}
                errorText={this.state.firstNameError} />
            </div>
            <div className="input">
              <TextField ref="lastName" type="text" hintText="Last Name"
                defaultValue={lastName} fullWidth={true}
                onChange={this.validateLastName.bind(this)}
                errorText={this.state.lastNameError} />
            </div>
            <div className="input">
              <TextField ref="photo" type="url" hintText="Photo URL"
                defaultValue={photo} fullWidth={true}
                onChange={this.validatePhoto.bind(this)}
                errorText={this.state.photoError} />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { editStudent })(EditStudentButton)
