import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navegacion from './Navegacion';
import Swal from 'sweetalert2';
import '../statics/css/EditarPerfil.css';
import '../statics/css/alerta.css';

function EditarPerfil(props) {
  const history = useHistory();
  const rol = props.location.state.Rol.toString();
  const imagenPerfil = props.location.state.ImagenPerfil.toString();
  const nombre = props.location.state.NombreUsuario.toString();

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
        text: 'custom-alert-text',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/participante/eliminarPerfil/${nombre}`, {
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
      <Navegacion />
      <br />
      <h2>Editar Perfil de {nombre}</h2>
      <div class="profile-container">
        <div class="picture-edit-container">
          <div class="card card-picture border-secondary mb-3">
            <img class="picture" src={imagenPerfil} alt="Imagen de perfil" />
            <button class="btn btn-outline-secondary edit-image-button" onClick={() => handleEditarCampo('imagen')}>
              Editar Imagen
            </button>
          </div>
        </div>
        <div class="profile-info">
          <table class="table">
            <tr>
              <td>Nombre:</td>
              <td>{perfil.nombre}</td>
              <td>
                <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('nombre')}>
                  Editar
                </button>
              </td>
            </tr>
            <tr>
              <td>Correo:</td>
              <td>{perfil.correo}</td>
              <td>
                <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('correo')}>
                  Editar
                </button>
              </td>
            </tr>
            <tr>
              <td>Username:</td>
              <td>{perfil.username}</td>
              <td>
                <button class="btn btn-outline-secondary" onClick={() => handleEditarCampo('username')}>
                  Editar
                </button>
              </td>
            </tr>
          </table>
          {rol === 'Participante' && (
            <button class="btn btn-outline-danger" onClick={EliminarPerfil}>
              Eliminar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditarPerfil;
