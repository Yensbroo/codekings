import axios from 'axios';
import { GET_CATEGORIES } from './types';

export const getCategories = () => dispatch => {
  axios
    .get('/api/v1/categories')
    .then(res => 
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
    }))
    .catch(err => 
      dispatch({
        type: GET_CATEGORIES,
        payload: null
      })
    )
}