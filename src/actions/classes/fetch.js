import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_CLASSES = 'FETCHED_CLASSES'
export const FETCHED_ONE_CLASS = 'FETCHED_ONE_CLASS'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/classes')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_CLASSES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

// export const fetchStudents = (aClass) => {
//   return dispatch => {
//     dispatch({ type: APP_LOADING })
//
//     api.get(`/classes/${aClass._id}/students`)
//       .then((result) => {
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({ type: LOAD_SUCCESS })
//
//         dispatch({
//           type: CLASS_STUDENTS_UPDATED,
//           payload: {
//             aClass,
//             students: result.body
//           }
//         })
//       })
//       .catch((error) => {
//         dispatch({ type: APP_DONE_LOADING })
//         dispatch({
//           type: LOAD_ERROR,
//           payload: error.message
//         })
//       })
//   }
// }

export const fetchOneClass = (classId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/classes/${classId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_CLASS,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
