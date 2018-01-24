import { FETCHED_CLASSES, FETCHED_ONE_CLASS } from '../actions/classes/fetch'
import { CLASS_CREATED } from '../actions/classes/create'
import { STUDENT_CREATED } from '../actions/students/create'
import { STUDENT_REMOVED } from '../actions/students/delete'

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

    case STUDENT_CREATED :
      const newStudent = { ...payload.student }
      const classId = payload.classId
      return state.map((aClass) => {
        if (aClass._id === classId) {
          const enlargedClass = [{...newStudent}].concat(aClass.students)
          return Object.assign({}, aClass, { students: enlargedClass })
        } else {
          return aClass
        }
      })

      case STUDENT_REMOVED :
        const modifiedClass = { ...payload }
        return state.map((aClass) => {
          console.log(aClass._id === modifiedClass._id)
          return aClass._id === modifiedClass._id ? modifiedClass : aClass
        })


    default :
      return state



  }
}
