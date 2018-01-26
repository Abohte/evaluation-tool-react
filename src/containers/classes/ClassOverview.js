import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import fetchClasses from '../../actions/classes/fetch'
import CreateClassButton from '../../components/classes/CreateClassButton'
import ClassItem from './ClassItem'
import './Classes.css'

class ClassOverview extends PureComponent {
  static propTypes = {
    classes: PropTypes.array.isRequired,
    fetchClasses: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { replace, signedIn, fetchClasses } = this.props
    signedIn ? fetchClasses() : replace('/sign-in')
  }

  renderClassItem = (aClass, index) => {
    return <ClassItem key={index} {...aClass}/>
  }

  render() {
    if (!this.props.signedIn) return null

    const { classes } = this.props
    const batchNumbers = classes.map((aClass) => aClass.batchNumber)
    return (
      <div className="Classes">
        <h1>All classes</h1>
        <main>
          {classes.map(this.renderClassItem)}
        </main>
        <footer>
          <CreateClassButton batchNumbers={batchNumbers}/>
        </footer>
      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }) => {
  return {
    classes,
    signedIn: !!currentUser && !!currentUser._id
  }
}


export default connect(mapStateToProps, { fetchClasses, replace })(ClassOverview)
