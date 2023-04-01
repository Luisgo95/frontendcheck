import axios from 'axios';

const API_URL = 'http://localhost:3001/users/';

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });

    if (response.data.accessToken) {
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
