import {EMPLOYEES_ERROR, EMPLOYEES_LIST} from '../actions/types';

const initialState = {
  employees: [],
  error: {},
  loading: true,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case EMPLOYEES_LIST:
      return {
        ...state,
        employees: payload,
        loading: false,
      };
    case EMPLOYEES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
