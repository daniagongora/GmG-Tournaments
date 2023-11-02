import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Vapor.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [mensaje, setMensaje] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('Correo', correo);
    data.append('Contrasenia', contrasenia);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Inicio de sesión exitoso, redirige al usuario a la página de bienvenida
        history.push('/MiPerfil', responseData);
      } else {
        // Muestra el mensaje de error en el formulario
        setMensaje(responseData.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setMensaje('Error de red. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          class="form-control"
        />
        <br></br>
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          class="form-control"
        />
        <br></br>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
