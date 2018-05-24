import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import flashReducer from './flashReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  category: categoryReducer,
  flash: flashReducer
});
