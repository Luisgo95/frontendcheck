import axios from 'axios';

const API_URL = 'http://localhost:3001/computerequiment';
const API_URL2 = 'http://localhost:3001/computerequiment/oneCompany';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchRegistros = async () => {
  return await axios.get(API_URL, getAuthHeader());
};

export const createRegistro = async (registro) => {
  return await axios.post(API_URL, registro, getAuthHeader());
};

export const updateRegistro = async (id, registro) => {
  return await axios.put(`${API_URL}/${id}`, registro, getAuthHeader());
};
export const getByCompany = async (id) => {
  return await axios.get(`${API_URL2}/${id}`, getAuthHeader());
};

export const deleteRegistro = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};
