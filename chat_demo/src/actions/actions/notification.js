import axios from 'axios';

export const sendNotification = (title, body, user) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const payload = JSON.stringify({title, body, user});
    console.log(payload);
    await axios.post(
      'http://192.168.0.13:5000/api/sendnotification',
      payload,
      config,
    );
  } catch (error) {
    console.log(error);
  }
};
