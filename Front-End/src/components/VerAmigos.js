import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navegacion from './Navegacion';
import '../statics/css/General.css';
import '../statics/css/alerta.css';
import '../statics/css/VerAmigos.css';

function VerAmigos(props) {
  const location = useLocation();
  const nombreUsuario = props.location.state.NombreUsuario.toString();
  
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
  
        <h2>Amigos de {nombreUsuario}</h2>
        <br></br>
  
        <div className="card body-content">
          <div className="card card-user">
            <button className="btn btn-menu btn-outline-secondary">Ver solicitudes</button>
          </div>
  
          {amigos.length === 0 ? (
            <div className="card card-empty">
              <p>Aún no tienes amigos</p>
            </div>
          ) : (
            <div className="card card-menu">
              <ul className="list">
                {amigos.map((amigo) => (
                  <li key={amigo.NombreParticipante} className="list-item">
                    <img src={amigo.ImagenPerfil} alt={amigo.NombreParticipante} className="list-image" />
                    <span className="list-name">{amigo.NombreParticipante}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </body>
    </div>
  );
  
}

export default VerAmigos;
