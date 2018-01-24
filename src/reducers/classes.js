import { FETCHED_CLASSES, FETCHED_ONE_CLASS } from '../actions/classes/fetch'
import { CLASS_CREATED } from '../actions/classes/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_CLASSES :
      return [ ...payload ]

    case FETCHED_ONE_CLASS :
      const classIds = state.map(aClass => aClass._id)
      if (classIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((aClass) => {
        if (aClass._id === payload._id) {
          return { ...payload }
        }
        return aClass
      })

    case CLASS_CREATED :
      const newClass = { ...payload }
      return [newClass].concat(state)

    default :
      return state

  }
}
