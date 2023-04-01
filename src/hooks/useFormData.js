import { useState } from 'react';

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = (newData = initialState) => {
    setFormData((prevState) => ({
        ...newData,
        // campo5: prevState.campo5,
      }));
  };

  return { formData, handleFormChange, resetFormData };
};

export default useFormData;
