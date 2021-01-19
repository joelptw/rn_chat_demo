import {combineReducers} from 'redux';
import auth from './auth';
import employees from './employees';
import chat from './chat';

export default combineReducers({
  auth,
  chat,
  employees,
});
