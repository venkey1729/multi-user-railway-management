import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getTrains = (source, destination) => {
  return axios.get(`http://localhost:5000/api/trains/search`, {
    params: { source, destination }
  });
};
export const bookSeat = (data, token) =>
  axios.post(`${API_URL}/bookings/book`, data, {
    headers: { Authorization: token },
  });
