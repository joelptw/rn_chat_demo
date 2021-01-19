import {CHAT_ROOM, CHAT_ERROR} from '../actions/types';

const initialState = {
  loading: true,
  room: null,
  error: null,
};

export default function(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case CHAT_ROOM:
      return {
        ...state,
        loading: false,
        room: payload,
      };
    case CHAT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
