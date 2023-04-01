import axios from 'axios';

const API_URL = 'http://localhost:3001/users/';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });
    console.log("antesDe",response.data)

    if (response.data.token) {
        console.log("Guardando user",response.data)
      sessionStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

const logoutUser = () => {
  sessionStorage.removeItem('user');
};

export { loginUser, logoutUser };
