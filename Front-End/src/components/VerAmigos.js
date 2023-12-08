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
        const confirmar = await Swal.fire({
          title: 'Amigo eliminado',
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'custom-alert-container',
            title: 'custom-alert-title',
            text: 'custom-alert-text',
            icon: 'custom-alert-icon',
          },
        });

        if (confirmar.isConfirmed){
          window.location.reload();
        }
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

  const BuscarUsuario = () => {
    
    history.push({
      pathname: `/perfil${idUsuario}/${nombreUsuario}/amigos/buscarUsuario`,
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

          <br></br>
          
          <div class="row"> 
            <div class="card card-user col-md-4">
                <div class="card card-picture border-secondary mb-4">
                  <MostrarImagenPerfil imagen={location.state.ImagenPerfil} />
                </div>

                <button class="btn btn-outline-secondary request-btn" onClick={VerSolicitudes}>Ver Solicitudes</button>

                <button className="btn btn-outline-secondary request-btn" onClick={BuscarUsuario}>Buscar Usuario</button>
                
            </div>

            <div class="card card-list col-md-8">
              {amigos.length === 0 ? (
                <div class="card card-empty container-fluid border-secondary align-items-center justify-content-center">
                  <h2 class= "card-empty-message">Aun no tienes amigos</h2>
                </div>
              ) : (
                <div class="card card-friends container-fluid border-secondary">
                  <ul class="list">
                    {amigos.map((amigo) => (
                      <li key={amigo.NombreParticipante} className="list-item">
                        <div className="row-md users d-flex flex-md-row flex-column">

                          <div className="col-md-7 d-flex align-items-center">
                            <div className="card list-image-container border-secondary">
                              <MostrarImagenPerfil imagen={amigo.ImagenPerfil} />
                            </div>
                            <div><h4 className="list-name ms-3">{amigo.NombreParticipante}</h4></div>
                          </div>
                            
                          <div className="col-md btn-solicitud d-flex align-items-center justify-content-center">
                            {/* <button className="btn btn-outline-secondary">Ver Perfil</button> */}
                            <button className="btn btn-outline-danger" 
                                    onClick={() => EliminarAmigo(parseInt(amigo.IDAmigo.toString()), parseInt(idUsuario))}>Eliminar
                            </button>
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