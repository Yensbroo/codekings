import axios from 'axios';
import { GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE } from './types';

export const getFavorites = () => dispatch => {
  axios
    .get('/api/v1/favorites')
    .then(res => 
      {console.log(res);
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