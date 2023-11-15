import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/EditarPerfil.css';
import '../statics/css/Alerta.css';

function EditarPerfil(props) {

  const history = useHistory();

  const [nombreCompleto, setNombreCompleto] = useState(props.location.state.NombreCompleto.toString());
  const [nombreUsuario, setNombreUsuario] = useState(props.location.state.NombreUsuario.toString());
  const [correo, setCorreo] = useState(props.location.state.Correo.toString());
  const [imagenPerfil, setImagenPerfil] = useState(props.location.state.ImagenPerfil.toString());
  const [rol, setRol] = useState(props.location.state.Rol.toString());

  const [mostrarModal, setMostrarModal] = useState(false);

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

  const EditarImagen = (campo) => {
    console.log(`Editar campo ${campo}`);
  };

  const CerrarModal = () => {
    setMostrarModal(false);
  };

  const AbrirModal = () => {
    setMostrarModal(true);
  };

  const EditarDatos = async () => {
    try {
      const campos = {
        NombreCompleto: document.getElementById('nombre').value,
        NombreParticipante: document.getElementById('username').value,
        Correo: document.getElementById('correo').value,
      };
  
      const response = await fetch(`http://localhost:5000/participante/editarPerfil/${nombreUsuario}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos),
      });
  
      if (response.ok) {
        setMostrarModal(false);
        setNombreCompleto(campos.NombreCompleto);
        setNombreUsuario(campos.NombreParticipante);
        setCorreo(campos.Correo);
        
        Swal.fire({
          title: 'Actualización de datos',
          text: 'Perfil actualizado exitosamente',
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
          text: 'Ocurrió un error al actualizar los datos de tu perfil',
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
  };  

  const Modal = ({ onClose, children }) => {
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="modalForm">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Editar Datos</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
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

                <button class="btn btn-outline-secondary edit-image" onClick={() => EditarImagen('imagen')}>Editar Imagen</button>   

                {rol === 'Participante' && (
                <button class="btn btn-outline-secondary delete-profile" onClick={EliminarPerfil}>Eliminar Perfil</button>
                )}
            </div>
          </div>

            <div class="card card-profile-info">
              <br></br>
              <table class="table">
                <tr>
                <td> <h5>Nombre:</h5> </td>
                <td> <h3>{nombreCompleto}</h3> </td>
                </tr>

                <br></br>

                <tr>
                <td> <h5>Username:</h5> </td>
                <td> <h3>{nombreUsuario}</h3> </td>
                </tr>

                <br></br>

                <tr>
                  <td> <h5>Correo:</h5> </td>
                  <td> <h3>{correo}</h3> </td>
                </tr>

                <br></br>

                <tr>
                  <td> <h5>Password:</h5> </td>
                </tr>
              </table>
            </div> 
            
            <button class="btn btn-outline-secondary edit-data" onClick={AbrirModal}>Editar Datos</button>

            {mostrarModal && (
              <Modal onClose={CerrarModal}>
                <form>
                  <div class="row">
                    <div class="col-md">
                      <label class="form-label modal-label" htmlFor="nombre">Nombre:</label>
                      <input class="modal-input" type="text" id="nombre" 
                             value={nombreCompleto} 
                             onChange={(e) => setNombreCompleto(e.target.value)}
                             autoFocus={true}/>
                    </div>
                    <div class="col-md">
                      <label class="form-label modal-label" htmlFor="username">Username:</label>
                      <input class="modal-input" type="text" id="username" 
                             value={nombreUsuario} 
                             onChange={(e) => setNombreUsuario(e.target.value)}
                             autoFocus={true}/>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md">
                      <label class="form-label modal-label" htmlFor="correo">Correo:</label>
                      <input class="modal-input" type="text" id="correo" 
                             value={correo} 
                             onChange={(e) => setCorreo(e.target.value)}
                             autoFocus={true}/>
                    </div>
                    <div class="col-md">
                      <label class="form-label modal-label" htmlFor="password">Password:</label>
                      <input class="modal-input" type="text" id="password" />
                    </div>
                  </div>
                  
                  <button class="btn btn-outline-secondary save-changes" type="submit" onClick={EditarDatos}>Guardar</button>
                </form>
              </Modal>
            )}
        </div> 
      </body>
    </div>
  );
}

export default EditarPerfil;