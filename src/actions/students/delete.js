import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const STUDENT_REMOVED = 'STUDENT_REMOVED'

export default (studentId, classId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    api.delete(`/class/${classId}/student/${studentId}`)
      .then((res) => {
        dispatch({ type: STUDENT_REMOVED, payload: res.body })
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
