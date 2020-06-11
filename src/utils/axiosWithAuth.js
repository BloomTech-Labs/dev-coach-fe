import axios from 'axios';

export default function axiosWithAuth() {
  const token =
    localStorage.getItem('token')
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      authorization: token

    },
  });
  return axiosInstance;
}
