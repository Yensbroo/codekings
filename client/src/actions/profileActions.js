import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_GITHUB
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/v1/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/v1/profile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get(`/api/v1/profile/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/v1/profile", profileData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? this can not be undone")) {
    axios.delete("/api/v1/profile").then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      )
    );
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};