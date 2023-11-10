import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navegacion from './Navegacion';
import Swal from 'sweetalert2';
import '../statics/css/General.css';
import '../statics/css/EditarPerfil.css';
import '../statics/css/alerta.css';

function EditarPerfil(props) {

  const history = useHistory();

  const correo = props.location.state.Correo.toString();
  const imagenPerfil = props.location.state.ImagenPerfil.toString();
  const nombreCompleto = props.location.state.NombreCompleto.toString();
  const nombreUsuario = props.location.state.NombreUsuario.toString();
  const rol = props.location.state.Rol.toString();
  
  
  const [perfil, setPerfil] = useState({
    nombre: '',
    correo: '',
    username: '',
  });

  const EliminarPerfil = async () => {
    const result = await Swal.fire({
      title: '¿Seguro que deseas eliminar tu perfil?',
      icon: 'warning',
      text: 'Esta es una acción irreversible',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-alert-container',
        title: 'custom-alert-title',
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/participante/eliminarPerfil/${nombreUsuario}`, {
          method: 'POST',
        });

        if (response.ok) {
          Swal.fire({
            title: 'Perfil eliminado',
            text: 'Perfil eliminado exitosamente',
            icon: 'success',
            customClass: {
              container: 'custom-alert-container',
              title: 'custom-alert-title',
              text: 'custom-alert-text',
              icon: 'custom-alert-icon',
            },
          });

          history.push('/');
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar el perfil',
            icon: 'error',
            customClass: {
              container: 'custom-alert-container',
              title: 'custom-alert-title',
              icon: 'custom-alert-icon',
            },
          });
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        Swal.fire({
          title: 'Ups! :(',
          text: 'Ocurrió un problema con el servidor por favor intenta más tarde',
          icon: 'error',
          customClass: {
            container: 'custom-alert-container',
            title: 'custom-alert-title',
            icon: 'custom-alert-icon',
          },
        });
      }
    }
  };

  const handleEditarCampo = (campo) => {
    console.log(`Editar campo ${campo}`);
  };

  return (

    <div>

      <body>
        <Navegacion/>

        <br></br>

        <div class="card body-content">
          
          <h2>Editar Perfil</h2>

          <div class="card card-user">

            <div class="card card-picture border-secondary mb-3">
                <img class="picture" src={imagenPerfil} alt="Imagen de perfil"/>

                <br></br>
                <button class="btn btn-outline-secondary edit-image" onClick={() => handleEditarCampo('imagen')}>
                  Editar Imagen
                </button>   

                {rol === 'Participante' && (
                <button class="btn btn-outline-secondary delete-profile" onClick={EliminarPerfil}>
                  Eliminar Perfil
                </button>
                )}
                
            </div>

          </div>

            <div class="card card-profile-info">
              <br></br>
              <table class="table">
                <tr>
                <td> <h5>Nombre:</h5></td>
                <td> <h3>{nombreCompleto}</h3></td>
                  {/* <td>
                    <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('nombre')}>
                      Editar
                    </button>
                  </td> */}
                </tr>

                <br></br>

                <tr>
                <td> <h5>Username:</h5></td>
                <td> <h3>{nombreUsuario}</h3></td>
                  {/* <td>
                    <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('correo')}>
                      Editar
                    </button>
                  </td> */}
                </tr>

                <br></br>

                <tr>
                  <td><h5>Correo:</h5></td>
                  <td> <h3>{correo}</h3></td>
                  {/* <td>
                    <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('username')}>
                      Editar
                    </button>
                  </td> */}
                </tr>

                <br></br>

                <tr>
                  <td> <h5>Password:</h5></td>
                  {/* <td>
                    <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('username')}>
                      Editar
                    </button>
                  </td> */}
                </tr>

              </table>
            </div> 
        </div> 
      </body>
      
    </div>
  );
}

export default EditarPerfil;
