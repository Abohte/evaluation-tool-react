// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import createStudent from '../../actions/students/create'

class CreateStudentButton extends PureComponent {
  static propTypes = {
    classId: PropTypes.string.isRequired
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
      this.props.createStudent(student, this.props.classId)
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
              <TextField ref="firstName" type="text"
                hintText="First Name" fullWidth={true}
                onChange={this.validateFirstName.bind(this)}
                errorText={this.state.firstNameError} />
            </div>
            <div className="input">
              <TextField ref="lastName" type="text"
                hintText="Last Name" fullWidth={true}
                onChange={this.validateLastName.bind(this)}
                errorText={this.state.lastNameError} />
            </div>
            <div className="input">
              <TextField ref="photo" type="url"
              hintText="Photo URL" fullWidth={true}
              onChange={this.validatePhoto.bind(this)}
              errorText={this.state.photoError} />
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
