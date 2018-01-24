// src/components/class/CreateClassButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createClass from '../../actions/classes/create'
import Dialog from 'material-ui/Dialog';

class CreateClassButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (!this.props.signedIn) return null
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <div className="CreateClassButton">
          <RaisedButton
            label="Create Class"
            primary={true}
            onClick={this.handleClickOpen}
            icon={<StarIcon />} />
        </div>
        <Dialog
          title="Create class"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Add form for creating a class!
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createClass })(CreateClassButton)
