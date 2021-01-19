import {LOGIN_SUCCESS} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {};
    default:
      return {};
  }
}
