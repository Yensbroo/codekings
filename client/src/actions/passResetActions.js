import axios from 'axios';
import {
  GET_ERRORS
} from './types';


export const sendRequest = (email, history) => dispatch => {
  axios.post('/api/v1/reset_request', email)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
};

export const resetPassword = (token, data, history) => dispatch => {
  axios.post(`/api/v1/reset_password/${token}`, data)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const denyReset = (token, history) => dispatch => {
  axios.delete(`/api/v1/deny_request/${token}`)
    .then(res => history.push('/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}