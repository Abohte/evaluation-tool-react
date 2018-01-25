// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';
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
    this.props.editStudent(student, this.props._id)
    this.handleClose()
  }

  render() {
    const { _id, firstName, lastName, photo } = this.props

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
              <TextField ref="firstName" type="text" hintText="First Name" defaultValue={firstName} fullWidth={true}/>
            </div>
            <div className="input">
              <TextField ref="lastName" type="text" hintText="Last Name" defaultValue={lastName} fullWidth={true} />
            </div>
            <div className="input">
              <TextField ref="photo" type="url" hintText="Photo URL" defaultValue={photo} fullWidth={true} />
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { editStudent })(EditStudentButton)
