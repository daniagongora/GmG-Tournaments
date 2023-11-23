import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Navegacion from './Navegacion';

import '../statics/css/General.css';
import '../statics/css/Perfil.css';

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

function Perfil() {

    const history = useHistory();
    const location = useLocation();

    const idUsuario = location.state.ID;
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = location.state.NombreUsuario;
    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const rol = location.state.Rol
  
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
                                <img class="picture" src={imagen1} alt="Imagen de perfil"/>                              
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