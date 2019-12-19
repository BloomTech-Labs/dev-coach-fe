import * as types from './actionTypes';
import axios from 'axios';

const url = process.env.REACT_APP_BASE_URL;

export const login = (props, values) => dispatch => {
  dispatch({ type: types.LOGIN_START });
  axios
    .post(`${url}user/login`, values)
    .then(res => {
      dispatch({ type: types.LOGIN_SUCCESSFUL });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.token);
      props.history.push('/dashboard');
    })
    .catch(err => {
      dispatch({ type: types.LOGIN_ERROR, payload: err });
    });
};

export const register = (props, values) => dispatch => {
  dispatch({ type: types.SIGN_UP });
  dispatch({ type: types.LOGIN_START });
  axios
    .post(`${url}user/register`, values)
    .then(res => {
      debugger
      dispatch({ type: types.SIGN_UP_SUCCESSFUL });
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch({ type: types.LOGIN_SUCCESSFUL });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.token);
      props.history.push('/dashboard');
    })
    .catch(err => {
      debugger
      dispatch({ type: types.SIGN_UP_ERROR, payload: err });
    });
};
