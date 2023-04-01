import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../../services/authService';
// import FormularioTabla from './components/FormularioTabla/FormularioTabla';
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
    if (response) {
      // Redirige al usuario a la página principal o a la página que desees después del inicio de sesión exitoso
      console.log('Inicio de sesión exitoso',response.token);
      localStorage.setItem("token", response.token);
      // history.push("/formulario-tabla");
      navigate("/formulario-tabla");
      // <FormularioTabla/>
    }
      // Aquí puedes agregar la llamada a la API para iniciar sesión
      // Por ejemplo: const response = await loginUser(username, password);
      // Si la respuesta es exitosa, guarda el token en sessionStorage o realiza la acción que desees
      setError(null);
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
