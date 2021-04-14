import { combineReducers } from 'redux';
import userReducer from './userslice';
export default combineReducers({
    user:userReducer
});