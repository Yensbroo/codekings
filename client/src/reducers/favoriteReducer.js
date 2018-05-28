import {GET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE, FAVORITES_LOADING } from '../actions/types';

const initialState = {
  favorites: [],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FAVORITES_LOADING:
    return {
      ...state,
      loading: true
    }
    case GET_FAVORITES:
    return {
      ...state,
      favorites: action.payload
    };
    default:
      return state;
  }
};