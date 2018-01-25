import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const STUDENT_UPDATED = 'STUDENT_UPDATED'

export default (student, studentId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.put(`/student/${studentId}`, student)
      .then((res) => {
        dispatch({ type: STUDENT_UPDATED, payload: res.body })
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
