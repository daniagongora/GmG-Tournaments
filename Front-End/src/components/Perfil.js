import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import MostrarImagenPerfil from './MostrarImagen';
import Navegacion from './Navegacion';

import '../statics/css/General.css';
import '../statics/css/Perfil.css';

function Perfil() {

    const history = useHistory();
    const location = useLocation();

    const idUsuario = location.state.ID;
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = location.state.NombreUsuario;
    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const rol = location.state.Rol;
  
    const EditarPerfil = () => {
        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/editar`,
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

    const VerAmigos = () => {
        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/amigos`,
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

<<<<<<< Updated upstream
    const CrearTorneo = () => {
        history.push({
          pathname: `/perfil${idUsuario}/${nombreUsuario}/misTorneos/crearTorneo`,
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

=======
>>>>>>> Stashed changes
    const EliminarTorneo = () => {
        history.push({
          pathname: `/perfil${idUsuario}/${nombreUsuario}/misTorneos`,
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
                <Navegacion/>   

                <div class="card body-content">
                    <div class="row"> 
                        <div class="card card-user col-md">
                            <div class="card card-picture border-secondary mb-2">
                                <MostrarImagenPerfil />
                            </div>

                            <div class="card card-username">
                                <h2 class="username"> {location.state.NombreUsuario} </h2>                          
                            </div>
                        </div>
                    </div>
                    
                    <div class="row"> 
                        <div class="card card-menu col-md">
                            <div class="button-container">
                                <button class="btn btn-menu btn-outline-secondary">Torneos</button>

                                {location.state.Rol === 'Participante' && (
                                    <button class="btn btn-menu btn-outline-secondary" onClick={VerAmigos}>Amigos</button>
                                )}

                                {location.state.Rol === "Administrador" && (
                                    <button class="btn btn-menu btn-outline-secondary" onClick={EliminarTorneo}>Crear Torneo</button>
                                )}

                                {location.state.Rol === 'SuperAdministrador' && (
                                    <button class="btn btn-menu btn-outline-secondary">Gestionar</button>
                                )}
                                
                                <button class="btn btn-menu btn-outline-secondary" onClick={EditarPerfil}>Editar Perfil</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>  
        </div>
    );
  }
  
  export default Perfil;