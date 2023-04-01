import React, { useState } from 'react';

const TablaRegistros = ({ registros, handleEdit, handleDelete, records }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = registros.filter((record) => {
    const values = Object.values(record);
    return values.some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
<div>


    <input
    type="text"
    placeholder="Buscar..."
    value={searchTerm}
    onChange={handleSearchChange}
  />
    <table className="table">
      <thead>
        <tr>
          <th>No. Cks</th>
          <th>FACE AMOUNT</th>
          <th>FEE CHARGED</th>
          <th>Cents</th>
          <th>CASH OUT</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredRecords.map((registro) => (
          <tr key={registro.id}>
            <td>{registro.numbercks}</td>
            <td>{registro.faceAmount}</td>
            <td>{Number(registro.feeCharged)*2}</td>
            <td>{registro.cents}</td>
            <td>{registro.cashOut}</td>
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
      </tbody>
    </table>
  </div>
  );
};

export default TablaRegistros;
