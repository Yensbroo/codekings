import axios from 'axios';

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  GET_ERRORS
} from './types';

export const addPost = (postData, history) => dispatch => {
  axios
    .post('/api/v1/posts', postData)
    .then(res => {
        history.push(`/post/${res.data._id}`)
        dispatch({
        type: ADD_POST,
        payload: res.data
      })}
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get('/api/v1/posts')
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_POSTS,
        payload: null
    }))
};

export const getUserPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios.get('/api/v1/posts/user')
      .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      }))
      .catch(err => 
        dispatch({
          type: GET_POSTS,
          payload: null
        }))
}
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading());

  axios
    .get(`/api/v1/post/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_POST,
        payload: null
    }))
};

export const deletePost = (id) => dispatch => {
  axios
    .delete(`/api/v1/post/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_POST,
        payload: id
    })
  )
    .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/v1/post/comment/${postId}`, commentData)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/v1/post/comment/${postId}/${commentId}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
};

export const likePost = id => dispatch => {
  axios
    .post(`/api/v1/post/like/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ) 
}

export const unlikePost = id => dispatch => {
  axios
    .delete(`/api/v1/post/unlike/${id}`)
    .then(res => 
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    ) 
}

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
