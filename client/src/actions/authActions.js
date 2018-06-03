import axios from "axios";
import qs from 'qs';
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  return axios
    .post("/api/v1/signup", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/v1/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const fbLoginUser = (accessToken) => dispatch => {
  const data = { 'access_token': accessToken};
  const JsonData = qs.stringify(data);
  axios
    .post("/api/v1/facebook", JsonData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const changePassword = userData => dispatch => {
  axios
    .post('/api/v1/user', userData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

export const changeAvatar = userData => dispatch => {
  axios
    .post('/api/v1/user/avatar', userData)
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
