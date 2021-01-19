import {CHAT_ROOM, CHAT_ERROR} from '../types';
import axios from 'axios';

export const chatRoom = (employee, employer) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({employee, employer});
    const chatRoom = await axios.post(
      'http://192.168.0.13:5000/api/chats',
      body,
      config,
    );

    dispatch({type: CHAT_ROOM, payload: chatRoom.data});
  } catch (error) {
    console.error(error);

    dispatch({
      type: CHAT_ERROR,
      payload: error,
    });
  }
};
