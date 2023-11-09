import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../statics/css/Login.css';
import '../statics/css/General.css';

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
        history.push('/perfil', responseData);
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

      <body>

        <div class="card body-content">

          <div class="title">   
            <h1>GmG <br></br>Tournaments</h1>
          </div>
          <br></br>
          <form onSubmit={handleSubmit}>
            <label class="form-label">Correo</label>
            <input type="email"
                  placeholder="Ingresa tu correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  class="form-control form-login"
            />
            <br></br>
            <label class="form-label">Contraseña</label>
            <input type="password"
                  placeholder="Ingresa tu contraseña "
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  class="form-control form-login"
            />
            <br></br><br></br>
            <button type="submit" class="btn btn-login btn-outline-secondary">Ingresar</button>
          </form>
          {mensaje && <p>{mensaje}</p>}

        </div>
        
      </body>  

    </div>
  );
}

export default Login;