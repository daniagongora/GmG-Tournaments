import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/EditarPerfil.css';
import '../statics/css/Alerta.css';

import imagen1 from '../statics/icons/crash.png';
import imagen2 from '../statics/icons/dave.jpg';
import imagen3 from '../statics/icons/doge.jpg';
import imagen4 from '../statics/icons/ender.jpg';
import imagen5 from '../statics/icons/fallguy.jpg';
import imagen6 from '../statics/icons/freddy.png';
import imagen7 from '../statics/icons/kirby.jpg';
import imagen8 from '../statics/icons/papitas.png';
import imagen9 from '../statics/icons/pingu.jpg';
import imagen10 from '../statics/icons/spidergwen.png';
import imagen11 from '../statics/icons/spidermiles.jpg';
import imagen12 from '../statics/icons/tracer.jpg';

function EditarPerfil(props) {

  const location = useLocation();
  const history = useHistory();

  const [nombreCompleto, setNombreCompleto] = useState(props.location.state.NombreCompleto.toString());
  const [nombreUsuario, setNombreUsuario] = useState(props.location.state.NombreUsuario.toString());
  const [correo, setCorreo] = useState(props.location.state.Correo.toString());
  const [contrasenia, setContrasenia] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState(props.location.state.ImagenPerfil.toString());
  const [rol, setRol] = useState(props.location.state.Rol.toString());

  const [mostrarModalImagen, setMostrarModalImagen] = useState(false);
  const [mostrarModalDatos, setMostrarModalDatos] = useState(false);

  const [imagenesDisponibles, setImagenesDisponibles] = useState([
    imagen1, imagen2, imagen3, imagen4,
    imagen5, imagen6, imagen7, imagen8, 
    imagen9, imagen10, imagen11, imagen12,
  ]);
  useEffect(() => {
    console.log('Rutas de imágenes:', imagenesDisponibles.map(img => img.default));
  }, [imagenesDisponibles]);

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

  const EditarImagen = () => {
    setMostrarModalImagen(true);
  };

  const EditarDatos = async (e) => {
    e.preventDefault();

    try {
      const campos = {
        NombreCompleto: document.getElementById('nombre').value,
        NombreParticipante: document.getElementById('username').value,
        Correo: document.getElementById('correo').value,
        Contrasenia: document.getElementById('contrasenia').value,
      };
  
      const response = await fetch(`http://localhost:5000/participante/editarPerfil/${nombreUsuario}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos),
      });
  
      if (response.ok) {
          setNombreCompleto(campos.NombreCompleto);
          setNombreUsuario(campos.NombreParticipante);
          setCorreo(campos.Correo);
          setContrasenia(campos.Contrasenia);
        
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

        setMostrarModalDatos(false);
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
  
  const ModalEditarImagen = ({ onClose, children }) => {
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="modalCard">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Selecciona una Imagen</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              { children }
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ModalEditarDatos = ({ onClose, children }) => {
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="modalForm">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Editar Datos</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={EditarDatos}> {children} </form>
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

        <div class="card body-content">
          
          <div class="row">
            <h2 class="title">Editar Perfil</h2>
          </div>
        
          <div class="row">

            <div class="card card-user col-md-4">

              <div class="card card-picture border-secondary mb-2">
                <img class="picture" src={"../statics/icons/"+location.state.ImagenPerfil} alt="Imagen de perfil"/>
              </div>

              <div class="btns">
                <button class="btn btn-outline-secondary edit-image" onClick={() => EditarImagen('imagen')}>Editar Imagen</button>   
                {rol === 'Participante' && (
                  <button class="btn btn-outline-secondary delete-profile" onClick={EliminarPerfil}>Eliminar Perfil</button>
                )}
              </div>
            </div>
              
            <div class="card text-end card-profile-info col-md-8">
              <div class="card-header">
                <div class="ml-auto">
                  <button class="btn btn-outline-secondary edit-data" onClick={() => setMostrarModalDatos(true)}>Editar Datos</button>
                </div>
              </div>
              <div class="table-responsive">
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
                    <td> <h5>Password:</h5></td>
                    <td> <h3>************</h3> </td>
                  </tr>
                </table>
              </div>
            </div> 
          </div>

          {mostrarModalImagen && (
            <ModalEditarImagen onClose={() => setMostrarModalImagen(false)}>
              <div className="imagen-container">
                {imagenesDisponibles.map((imagen, index) => (
                  <img
                    class="album-image"
                    key={index}
                    src={imagen}
                    alt={`img${index}`}
                  />
                ))}
              </div>
            </ModalEditarImagen>
          )}

          {mostrarModalDatos && (
            <ModalEditarDatos onClose={() => setMostrarModalDatos(false)}>
              <form>
                <div class="row">
                  <div class="col-md">
                    <label class="form-label modal-label" htmlFor="nombre">Nombre:</label>
                    <input class="modal-input" type="text" id="nombre" required
                            defaultValue={nombreCompleto} />
                  </div>
                  <div class="col-md">
                    <label class="form-label modal-label" htmlFor="username">Username:</label>
                    <input class="modal-input" type="text" id="username" required
                            defaultValue={nombreUsuario} />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md">
                    <label class="form-label modal-label" htmlFor="correo">Correo:</label>
                    <input class="modal-input" type="email" id="correo" required
                            defaultValue={correo} />
                  </div>
                  <div class="col-md">
                    <label class="form-label modal-label" htmlFor="contrasenia">Password:</label>
                    <input class="modal-input" type="password" id="contrasenia" required
                            defaultValue={"************"} />
                  </div>
                </div>
                
                <button class="btn btn-outline-secondary save-changes" type="submit" onClick={EditarDatos}>Guardar</button>
              </form>
            </ModalEditarDatos>
          )}
        </div>  
      </body>
    </div>
  );
}

export default EditarPerfil;