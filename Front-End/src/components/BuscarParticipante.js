import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/BuscarParticipante.css';


function BuscarParticipante(props){
    const { idUsuario } = useParams();
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
    const [rol, setRol] = useState('');
    const [imagen, setImagenPerfil] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        const data = new FormData();
        data.append('NombreUsuario', usuarioBusqueda);

        try {
            const response = await fetch(`http://localhost:5000/participante/perfil${idUsuario}/${nombreUsuario}/buscarParticipante`, {
                method: 'POST',
                body: data,
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Busqueda exitosa, muestra los datos del usuario encontrado
                setMensaje('');
                setUsuario(responseData.NombreUsuario);
                setNombre(responseData.NombreCompleto);
                setRol(responseData.Rol);
                setImagenPerfil(responseData.ImagenPerfil);
            } else {
                // Muestra el mensaje de error
                setMensaje(responseData.message || 'Error desconocido');
            }
        } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        setMensaje('Error de red. Inténtalo de nuevo.');
        }
    };

    const handleVolverAdministrador = async () => {
        try {
          const response = await fetch(`http://localhost:5000/superadministrador/perfil${idUsuario}/volverAdministrador/${usuario.toString()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });
    
          const responseData = await response.json();
    
          if (response.ok && responseData.success) {
            console.log('El participante ahora es Administrador');
            setMensaje('El participante ahora es Administrador');
          } else {
            console.error(responseData.message || 'Error desconocido');
            setMensaje('Error al actualizar el rol del participante');
          }
        } catch (error) {
          console.error('Error al procesar la solicitud:', error);
          setMensaje('Error de red. Inténtalo de nuevo.');
        }
      };

    const EliminarPerfil = async () => {
      const result = await Swal.fire({
        title: '¿Seguro que deseas asignar a este usuario como administrador?',
        icon: 'warning',
        text: '',
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
          const response = await fetch(`http://localhost:5000/superadministrador/perfil${idUsuario}/volverAdministrador/${usuario}`, {
            method: 'POST',
          });

          if (response.ok) {
            Swal.fire({
              title: 'Usuario asignado como administrador',
              text: '',
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
              text: 'Ocurrió un error al asignar administrador',
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
    

  return (

    <div>
        <body>
            <Navegacion/>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>
                Nombre:
                <input type="text" value={usuarioBusqueda} onChange={(e) => setUsuarioBusqueda(e.target.value)} />
                </label>
                <button type="submit">Buscar</button>
            </form>
            <br></br>
            {mensaje && <p>{mensaje}</p>}
            <br></br>
            {!mensaje && usuario && (
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">Resultados de Búsqueda</div>
                    <div class="card-body">
                        <tr>
                        <td> <h5>Username:</h5> </td>
                        <td> <h3>{usuario}</h3> </td>
                        </tr>

                        <br></br>

                        <tr>
                        <td> <h5>Nombre:</h5> </td>
                        <td> <h3>{nombre}</h3> </td>
                        </tr>

                        <br></br>
                        <button class="btn btn-outline-danger delete-profile" onClick={EliminarPerfil}>Eliminar Perfil</button>
                        <button className="btn btn-menu btn-outline-secondary" onClick={handleVolverAdministrador}>Volver Administrador</button>
                                
                    </div>
                    
                </div>               
            )}
      </body>
    </div>
  );
}

export default BuscarParticipante;