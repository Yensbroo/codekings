import axios from 'axios';
import { GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, GET_ERRORS } from './types';

export const getFavorites = () => dispatch => {
  axios
    .get('/api/v1/favorites')
    .then(res => 
      {
        dispatch({
          type: GET_FAVORITES,
          payload: res.data
      })
      }
      )
    .catch(err => 
      dispatch({
        type: GET_FAVORITES,
        payload: null
      })
    )
};

export const addFavorite = (id) => dispatch => {
  axios
    .post(`/api/v1/favorites`, id)
    .then(res =>
      
      dispatch({
        type: ADD_FAVORITE,
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

export const deleteFavorite = (postId) => dispatch => {
  axios
    .delete(`/api/v1/favorites/${postId}`)
    .then(res =>
     
      dispatch({
        type: DELETE_FAVORITE,
        payload: res.data.id
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteAllFavorites = () => dispatch => {
  axios.delete('/api/v1/favorites/')
      .then(res => 
        dispatch({
          type: GET_FAVORITES,
          payload: {}
        })
      )
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
}