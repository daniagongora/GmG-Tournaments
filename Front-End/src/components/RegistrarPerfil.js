import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/RegistrarPerfil.css';

function RegistrarPerfil() {
  
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarcontrasenia, setConfirmarContrasenia] = useState('');
  const [mensaje, setMensaje] = useState('');

  const history = useHistory();

  const RegistrarPerfil = async (e) => { 
    
    e.preventDefault(); 

    const data = new FormData();

    data.append('NombreCompleto', nombre);
    data.append('NombreUsuario', usuario);
    data.append('Correo', correo);
    data.append('Contrasenia', contrasenia);
    data.append('ConfirmarContrasenia', confirmarcontrasenia)

    try {
      const response = await fetch('http://localhost:5000/registro', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        Swal.fire({
          title: 'Perfil registrado exitosamente',
          text: 'Por favor, inicia sesión',
          icon: 'success',
          customClass: {
            container: 'custom-alert-container',
            title: 'custom-alert-title',
            text: 'custom-alert-text',
            icon: 'custom-alert-icon',
          },
        });

        history.push(`/`);
      } else {
        setMensaje(responseData.message || 'Error desconocido');
      }
    } catch (error) {
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
          
          <div class="subtitle">   
            <h3>Registro</h3>
          </div>

          <br></br>

          <form onSubmit={RegistrarPerfil}>
            <div class="row">
              <div class="col-md-4">
                <label class="form-label">Nombre completo</label>
                <input type="text"
                       placeholder="Ingresa tu nombre completo"
                       value={nombre}
                       onChange={(e) => setNombre(e.target.value)}
                       class="form-control form-login" />
              </div>
              
              <div class="col-md-4">
                <label class="form-label">Nombre de usuario</label>
                <input type="text"
                       placeholder="Ingresa tu nombre de usuario"
                       value={usuario}
                       onChange={(e) => setUsuario(e.target.value)}
                       class="form-control form-login" />
              </div>

              <div class="col-md-4">
                <label class="form-label">Correo</label>
                <input type="email"
                       placeholder="Ingresa tu correo"
                       value={correo}
                       onChange={(e) => setCorreo(e.target.value)}
                       class="form-control form-login" />
              </div> 
            </div>  

            <div class="row">  
              <div class="col-md-2"></div>

              <div class="col-md-4">
                <label class="form-label">Contraseña</label>
                <input type="password"
                       placeholder="Ingresa tu contraseña "
                       value={contrasenia}
                       onChange={(e) => setContrasenia(e.target.value)}
                       class="form-control form-login" />
              </div>

              <div class="col-md-4">
                <label class="form-label">Confirma tu contraseña</label>
                <input type="password"
                       placeholder="Ingresa tu contraseña otra vez"
                       value={confirmarcontrasenia}
                       onChange={(e) => setConfirmarContrasenia(e.target.value)}
                       class="form-control form-login" />
              </div>
            </div>

            <button type="submit" class="btn btn-outline-secondary btn-create-account">Crear Cuenta</button>
            {mensaje && <p>{mensaje}</p>}
          </form>
        </div>
      </body>  
    </div>
  );
}

export default RegistrarPerfil;