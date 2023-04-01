import React from 'react';
import useApi from '../../hooks/useApi';
import useFormData from '../../hooks/useFormData';
import Formulario from './Formulario';
import TablaRegistros from './TablaRegistros';
import LogoutButton from '../buttons/buttonLogout';
    
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
  const { data, isLoading, error, addRecord, updateRecord, deleteRecord } = useApi();

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