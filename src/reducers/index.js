import {combineReducers} from 'redux';
import LoginReducer from './reducer_main';

const rootReducer = combineReducers({
  login: LoginReducer,
});

export default rootReducer;
