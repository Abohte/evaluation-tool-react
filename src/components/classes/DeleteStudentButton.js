// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import removeStudent from '../../actions/students/delete'

class DeleteStudentButton extends PureComponent {
  static propTypes = {
    studentId: PropTypes.string.isRequired
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

  submitDelete(event) {
    event.preventDefault()
    this.props.removeStudent(this.props.studentId)
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
        label="Delete"
        primary={true}
        disabled={false}
        onClick={this.submitDelete.bind(this)}
      />,
    ];

    return (
      <div>
        <FloatingActionButton mini={true} onClick={this.handleClickOpen}>
          <ContentClear />
        </FloatingActionButton>
        <Dialog
          title="Remove student"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { removeStudent })(DeleteStudentButton)
