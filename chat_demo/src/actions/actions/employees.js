import {EMPLOYEES_ERROR, EMPLOYEES_LIST} from '../types';
import axios from 'axios';

export const getEmployees = () => async dispatch => {
  try {
    const employees = await axios.get('http://192.168.0.13:5000/api/employees');

    dispatch({
      payload: employees.data,
      type: EMPLOYEES_LIST,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      payload: error,
      type: EMPLOYEES_ERROR,
    });
  }
};
