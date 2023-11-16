import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/Alerta.css';
import '../statics/css/VerAmigos.css';

function VerAmigos(props) {
  const location = useLocation();
  
  const nombreUsuario = props.location.state.NombreUsuario.toString();
  const imagenPerfil = props.location.state.ImagenPerfil;

  const [amigos, setAmigos] = useState([]);

  useEffect(() => {
    const obtenerAmigos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/participante/verAmigos/${nombreUsuario}`);
        const data = await response.json();

        if (data.success) {
          setAmigos(data.amigos);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al obtener la lista de amigos',
                icon: 'error',
                customClass: {
                  container: 'custom-alert-container',
                  title: 'custom-alert-title',
                  icon: 'custom-alert-icon',
                },
              });
        }
      } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error con el servidor al obtener la lista de amigos',
            icon: 'error',
            customClass: {
              container: 'custom-alert-container',
              title: 'custom-alert-title',
              icon: 'custom-alert-icon',
            },
          });
      }
    };

    obtenerAmigos();
  }, [nombreUsuario]);

  return (
    <div>
      <body>
        <Navegacion />

        <div className="card body-content">

          <div class="row">
            <h2 class="title">Mis Amigos</h2>
          </div>

          <div class="row"> 

            <div class="card card-user col-md-4">

                <div class="card card-picture border-secondary mb-2">
                    <img class="picture" src={location.state.ImagenPerfil} alt="Imagen de perfil"/>                              
                </div>

                <div class="card card-username">
                    <h2 class="username"> {location.state.NombreUsuario} </h2>                          
                </div>

                <button class="btn btn-outline-secondary request-btn">Ver Solicitudes</button>
            </div>

            <div class="card card-list col-md-8">

              {amigos.length === 0 ? (
                <div class="card card-empty container-fluid border-secondary d-flex align-items-center justify-content-center">
                  <h2 class= "card-empty-message">Aun no tienes amigos</h2>
                </div>
              ) : (
                <div class="card card-friends container-fluid border-secondary">
                  <ul class="list row">
                    {amigos.map((amigo) => (
                      <li key={amigo.NombreParticipante} class="list-item col-md-4">
                        <div class="card list-image-container border-secondary">
                          <img src={amigo.ImagenPerfil} alt={amigo.NombreParticipante} class="list-image" />
                        </div>
                        <span><h4 class="list-name">{amigo.NombreParticipante}</h4></span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default VerAmigos;