import axios from 'axios';

export const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: 'http://orozkg.pythonanywhere.com/api/v1/',
});
