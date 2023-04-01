// import React from 'react';
import './formulario'
// import './App.css';
import './formulario.css'
import React, { useState, useEffect } from 'react';

const Formulario = ({ formData, handleFormChange, handleSubmit }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  useEffect(() => {
    fetchSelectOptions();
  }, []);

  const fetchSelectOptions = async () => {
    try {
      const response = await fetch('https://your-backend-api/endpoint');
      const data = await response.json();
      setSelectOptions(data);
    } catch (error) {
      console.error('Error fetching select options:', error);
    }
  };
  // ...

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3">
    <div className="grid-form">
         <label htmlFor="input1" for="numero">No. Cks</label>
      <label htmlFor="input2" for="numero">FACE AMOUNT</label>
      <label htmlFor="input3" for="numero">CENTS</label>
      <label htmlFor="input4" for="numero">COMPUTER</label>


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
        onChange
        type="text"
        name="cents"
        value={formData.cents}
        onChange={handleFormChange}
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
      name="computerequiment"
      id="input4"
      value={formData.computerequiment}
      onChange={handleFormChange}
      className="form-control mr-2"
    >
      <option value="">Selecciona una opción</option>
      {selectOptions.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
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
