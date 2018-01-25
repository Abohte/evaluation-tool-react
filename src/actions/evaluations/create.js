import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const EVALUATION_CREATED = 'EVALUATION_CREATED'

export default (evaluation, studentId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/student/${studentId}/evaluations`, evaluation)
      .then((res) => {
        dispatch({ type: EVALUATION_CREATED, payload: res.body })
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
