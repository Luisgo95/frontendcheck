import { useState } from 'react';

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    console.log('Updated formData:', updatedFormData);
    setFormData(updatedFormData);
  };

  const resetFormData = (newData = initialState) => {
    setFormData((prevState) => ({
        ...newData,
         computer_equipment_id: prevState.computer_equipment_id,
      }));
  };

  return { formData, handleFormChange, resetFormData };
};

export default useFormData;
