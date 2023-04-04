import axios from 'axios';

const API_URL = 'http://localhost:3001/registros';

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

export const deleteRegistro = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeader());
};
export const getRegistrosByDate = async (startDate, endDate, idCompany, computerID) => {

  console.log("fecha",startDate)
  console.log("endDate",endDate)
  console.log("idCompany",idCompany)
  console.log("computerID",computerID)
  return await axios.get(`${API_URL}/forviewcustom/${idCompany}/${computerID}/${startDate}/${endDate}`, getAuthHeader());
  
  // return await axios.get(`${API_URL}/forviewcustom/1/1/2023-04-01/2023-04-01`, getAuthHeader());
};

