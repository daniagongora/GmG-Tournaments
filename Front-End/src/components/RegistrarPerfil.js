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

    <div className="card body-content">
      <div className="title">   
        <h1>GmG <br />Tournaments</h1>
      </div>
      
      <div className="subtitle">   
        <h3>Registro</h3>
      </div>

      <br />

      <form onSubmit={RegistrarPerfil}>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Nombre completo</label>
            <input type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="form-control form-login" />
          </div>
          
          <div className="col-md-4">
            <label className="form-label">Nombre de usuario</label>
            <input type="text"
                    placeholder="Ingresa tu nombre de usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="form-control form-login" />
          </div>

          <div className="col-md-4">
            <label className="form-label">Correo</label>
            <input type="email"
                    placeholder="Ingresa tu correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="form-control form-login" />
          </div> 
        </div>  

        <div className="row">  
          <div className="col-md-2"></div>

          <div className="col-md-4">
            <label className="form-label">Contraseña</label>
            <input type="password"
                    placeholder="Ingresa tu contraseña "
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                    className="form-control form-login" />
          </div>

          <div className="col-md-4">
            <label className="form-label">Confirma tu contraseña</label>
            <input type="password"
                    placeholder="Ingresa tu contraseña otra vez"
                    value={confirmarcontrasenia}
                    onChange={(e) => setConfirmarContrasenia(e.target.value)}
                    className="form-control form-login" />
          </div>
        </div>

        <button type="submit" className="btn btn-outline-secondary btn-create-account">Crear Cuenta</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

export default RegistrarPerfil;