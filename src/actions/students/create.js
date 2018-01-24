import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const STUDENT_CREATED = 'STUDENT_CREATED'

export default (student, classId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/class/${classId}/students`, student)
      .then((res) => {
        dispatch({ type: STUDENT_CREATED, payload: { student: res.body, classId: classId }})
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
