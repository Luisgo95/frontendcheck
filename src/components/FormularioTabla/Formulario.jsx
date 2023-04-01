// import React from 'react';
import './formulario'
// import './App.css';
import './formulario.css'
import React, { useState, useEffect } from 'react';
import useApi2 from '../../hooks/useApiComputerEquiment';

const Formulario = ({ formData, handleFormChange, handleSubmit }) => {
  const { data,fetchDataCompany} = useApi2();

  // const [selectValue, setSelectValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
 
  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);
      // {company} = userObject
      console.log("Objeto",userObject.company);
      fetchDataCompany(userObject.company); 
    } else {
      console.log('No user found in sessionStorage');
    }
    // if (userObject.company) {
    //   fetchDataCompany(userObject.company);
    // }
  }, []);


  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
    <div className="grid-form">
         <label htmlFor="input1">No. Cks</label>
      <label htmlFor="input2">FACE AMOUNT</label>
      <label htmlFor="input3">CENTS</label>
      <label htmlFor="input4">COMPUTER</label>


      <input
        type="text"
        id="input1"
        name="numbercks"
        aria-label="Campo"
        value={formData.numbercks}
        onChange={handleFormChange}
        className="form-control mr-2"
        placeholder="No. Cks"
      />
      <input
        type="text"
        id="input2"
        name="faceAmount"
        value={formData.faceAmount}
        onChange
        type="text"
        name="faceAmount"
        value={formData.faceAmount}
        onChange={handleFormChange}
        className="form-control mr-2"
        placeholder="FACE AMOUNT"
      />
       {/* <input
        type="text"
        id="input3"
        name="feeCharged"
        value={formData.feeCharged}
        onChange
        type="text"
        name="feeCharged"
        value={formData.feeCharged}
        onChange={handleFormChange}
        className="form-control mr-2"
        placeholder="Campo 3"
      />
       */}
   
       <input
        type="text"
        id="input3"
        name="cents"
        value={formData.cents}
        // onChange={handleSelectChange}
        onChange={handleFormChange}
        type="text"
        name="cents"
        value={formData.cents}
        // onChange={handleFormChange}
        className="form-control mr-2"
        placeholder="CENTS"
      />
    
{/* 
      <input
       id="input5"
        type="number"
        name="cashOut"
        value={formData.cashOut}
        label="Numero"
        onChange={handleFormChange}
        className="custom form-control mr-2"
        placeholder="Campo 5"
      /> */}
        <select
          name="computer_equipment_id"
          id="input4"
          value={formData.computer_equipment_id}
          onChange={handleFormChange}
          className="form-control mr-2"
        >
          <option value="">Selecciona una opción</option>
          {data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.equipment_name}
            </option>
          ))}
        </select>

      <button type="submit" className="btn btn-primary">
        Agregar
      </button>
      </div>
    </form>
  );
};

export default Formulario;
