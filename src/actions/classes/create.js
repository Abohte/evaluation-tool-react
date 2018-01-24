import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const CLASS_CREATED = 'CLASS_CREATED'

export default (aClass) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post('/classes', aClass)
      .then((res) => {
        dispatch({ type: CLASS_CREATED, payload: res.body })
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
