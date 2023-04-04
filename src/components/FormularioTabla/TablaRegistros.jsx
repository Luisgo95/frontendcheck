import React, { useState, useEffect } from 'react';
import { utils, writeFile } from 'xlsx';
import { format } from 'date-fns';
const TablaRegistros = ({ registros, handleEdit, handleDelete, records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [extendedRecords, setExtendedRecords] = useState([]);
  // const [filteredRecords, setFilteredRecords] = useState([]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const extendedRecords = registros.map((registro) => {
    return {
      ...registro,
      calculatedFee: (Number(registro.faceAmount) * Number(registro.percentTable)).toFixed(2),
      calculatedDifference: (Number(registro.faceAmount) - (Number(registro.faceAmount) * Number(registro.percentTable)) - Number(registro.cents)).toFixed(2)
    };
  });

console.log("extendedRecords",extendedRecords)
console.log("registros",registros)
  const filteredRecords = extendedRecords.filter((record) => {
    const values = Object.values(record);
    return values.some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalFaceAmount = filteredRecords.reduce((acc, record) => acc + Number(record.faceAmount), 0);
  const totalCalculatedFee = filteredRecords.reduce((acc, record) => acc + Number(record.calculatedFee), 0);
  const totalCents = filteredRecords.reduce((acc, record) => acc + Number(record.cents), 0);
  const totalCalculatedDifference = filteredRecords.reduce((acc, record) => acc + Number(record.calculatedDifference), 0);

  const exportToExcel = () => {
    const data = [
      ['Numbercks', 'Face Amount', 'Calculated Fee', 'Cents', 'Cash out'],
      ...filteredRecords.map((registro, index) => [
        1 + index,
        parseFloat(registro.faceAmount),
        parseFloat(registro.calculatedFee),
        parseFloat(registro.cents),
        parseFloat(registro.calculatedDifference)
      ]),
      [
        'Total',
        parseFloat(totalFaceAmount.toFixed(2)),
        parseFloat(totalCalculatedFee.toFixed(2)),
        parseFloat(totalCents.toFixed(2)),
        parseFloat(totalCalculatedDifference.toFixed(2))
      ]
    ];

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, 'export.xlsx');
  };
  const today = format(new Date(), 'yyyy-MM-dd');
  // const storeName = registros.length > 0 ? registros[0].name : '';
  return (
<div>
<header>
<h1>
    {filteredRecords.length > 0 && filteredRecords[0].name
      ? filteredRecords[0].name
      : ' '}{' '}
    - Check Cashing
  </h1>
           <h2>{today}</h2>
      </header>
      <button className="btn btn-primary" onClick={exportToExcel}>
        Exportar a Excel
      </button>


    <input
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={handleSearchChange}
  />
    <table className="table">
      <thead>
        <tr>
          {/* <th>No</th> */}
          <th>No. Cks</th>
          <th>FACE AMOUNT</th>
          <th>FEE CHARGED</th>
          <th>Cents</th>
          <th>CASH OUT</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {filteredRecords.map((registro, index) => (
    <tr key={registro.id}>
      <td>{1 + index}</td>
          <td>{registro.faceAmount}</td>
          <td>{registro.calculatedFee}</td>
          <td>{registro.cents}</td>
          <td>{registro.calculatedDifference}</td>
            <td>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(registro)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(registro.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
          <tr>
    <td>Total</td>
    {/* <td></td> */}
    <td>{totalFaceAmount.toFixed(2)}</td>
    <td>{totalCalculatedFee.toFixed(2)}</td>
    <td>{totalCents.toFixed(2)}</td>
    <td>{totalCalculatedDifference.toFixed(2)}</td>
    <td></td>
  </tr>
      </tbody>
    </table>
  </div>
  );
};

export default TablaRegistros;
