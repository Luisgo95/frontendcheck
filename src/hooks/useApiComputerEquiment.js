import { useState, useEffect } from 'react';
import { fetchRegistros,getByCompany, createRegistro, updateRegistro, deleteRegistro } from '../services/computerEquimentService';

const useApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchRegistros();
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchDataCompany = async (id) => {
    setIsLoading(true);
    try {
      const response = await getByCompany(id);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addRecord = async (record) => {
    try {
      await createRegistro(record);
      setData((prevData) => [...prevData, record]);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const updateRecord = async (id, record) => {
    try {
      await updateRegistro(id, record);
      setData((prevData) => prevData.map((item) => (item.id === id ? record : item)));
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
        if (id!=null){

            await deleteRegistro(id);
            setData((prevData) => prevData.filter((item) => item.id !== id));
            setError(null);
        }

    } catch (error) {
      setError(error);
    }
  };

  return { data, isLoading, error, addRecord, updateRecord, deleteRecord,fetchDataCompany };
};

export default useApi;
