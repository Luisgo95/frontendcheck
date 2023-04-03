// import React from 'react';
import useApi from '../../hooks/useApi';
import useFormData from '../../hooks/useFormData';
import Formulario from './Formulario';
import TablaRegistros from './TablaRegistros';
import LogoutButton from '../buttons/buttonLogout';
import React, { useState, useEffect } from 'react';
const initialFormData = { 
  id: null,
  numbercks: '',
  faceAmount: '',
  feeCharged: '',
  cents: '',
  // computerequiment:'',
  cashOut: 0,
  computer_equipment_id:''
   };

const FormularioTabla = () => {
  const { formData, handleFormChange, resetFormData } = useFormData(initialFormData);
  const { data, isLoading, error, addRecord, updateRecord, deleteRecord, fetchRegistrosByDate } = useApi();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agrega un cero al inicio y toma los últimos dos dígitos.
    const day = ('0' + date.getDate()).slice(-2); // Agrega un cero al inicio y toma los últimos dos dígitos.
  
    return `${year}-${month}-${day}`;
  };
  
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  
  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);
      console.log("Objeto", userObject.company);
       fetchRegistrosByDate(formattedDate, formattedDate, userObject.company,formData.computer_equipment_id);
      // console.log("vuelta", datoss);
      // getRegistrosByDate(startDate, endDate, idCompany, computerID);
    } else {
      console.log('No user found in sessionStorage');
    }
  }, [formData.computer_equipment_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id === null) {
      addRecord(formData);
    } else {
      updateRecord(formData.id, formData);
    }
    resetFormData();
  };

  const handleEdit = (registro) => {
    resetFormData(registro);
  };

  return (
    <div>
      <Formulario formData={formData} handleFormChange={handleFormChange} handleSubmit={handleSubmit} />
      {isLoading ? (
        <p>Cargando registros...</p>
      ) : error ? (
        <p>Error al cargar registros: {error.message}</p>
      ) : (
        <TablaRegistros registros={data} handleEdit={handleEdit} handleDelete={deleteRecord} />
        )}
        <LogoutButton/>
      </div>
    );
  };
  export default FormularioTabla;