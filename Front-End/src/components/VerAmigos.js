import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MostrarImagenPerfil from './MostrarImagen';
import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/Alerta.css';
import '../statics/css/VerAmigos.css';

function VerAmigos(props) {

  const history = useHistory();
  const location = useLocation();
  
  const idUsuario = location.state.ID;
  const nombreCompleto = location.state.NombreCompleto;
  const nombreUsuario = location.state.NombreUsuario;
  const correo = location.state.Correo;
  const imagenPerfil = location.state.ImagenPerfil;
  const rol = location.state.Rol;

  const [amigos, setAmigos] = useState([]);
  useEffect(() => {
    const obtenerAmigos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/participante/perfil${idUsuario}/${nombreUsuario}/amigos`);
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
  }, [idUsuario, nombreUsuario]);

  const EliminarAmigo = async (particpante1, particpante2) => {
    try {
        const response = await fetch(`http://localhost:5000/participante/eliminar_amistad/${particpante1}/${particpante2}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Amigo eliminado',
          icon: 'success',
          customClass: {
            container: 'custom-alert-container',
            title: 'custom-alert-title',
            text: 'custom-alert-text',
            icon: 'custom-alert-icon',
          },
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar',
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
        text: 'Ocurrió un error con el servidor',
        icon: 'error',
        customClass: {
          container: 'custom-alert-container',
          title: 'custom-alert-title',
          icon: 'custom-alert-icon',
        },
      });
    }
  };

  const VerSolicitudes = () => {
    history.push({
      pathname: `/perfil${idUsuario}/${nombreUsuario}/solicitudes`,
      state: {
        ID: idUsuario,
        NombreCompleto: nombreCompleto,
        NombreUsuario: nombreUsuario,
        Correo: correo,
        ImagenPerfil: imagenPerfil,
        Rol: rol,
      },
    });
  };

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
                  <MostrarImagenPerfil imagen={location.state.ImagenPerfil} />
                </div>

                <div class="card card-username">
                    <h2 class="user"> {location.state.NombreUsuario} </h2>                          
                </div>

                <button class="btn btn-outline-secondary request-btn" onClick={VerSolicitudes}>Ver Solicitudes</button>
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
                      <li key={amigo.NombreParticipante} className="list-item col-md-6">
                        <div className="row">
                          <div className="col-md d-flex align-items-center">
                            <div className="card list-image-container border-secondary">
                              <MostrarImagenPerfil imagen={amigo.ImagenPerfil} />
                            </div>

                            <span><h4 className="list-name ms-3 col-md">{amigo.NombreParticipante}</h4></span>
                            
                            <span className="btn btn-outline-danger btn-delete-friend ms-5 "
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => EliminarAmigo(parseInt(amigo.IDAmigo.toString()), parseInt(idUsuario))}
                                  role="img"
                                  aria-label="Bote de basura">&#128465;
                            </span>
                          </div>
                        </div>
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