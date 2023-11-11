import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../statics/css/Perfil.css';
import '../statics/css/General.css';
import Navegacion from './Navegacion';


function Perfil() {

    const history = useHistory();
    const location = useLocation();

    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = location.state.NombreUsuario;
    const rol = location.state.Rol
  
    const EditarPerfil = () => {
        history.push({
            pathname: `/editarperfil/${nombreUsuario}`,
            state: {
                Correo: correo,
                ImagenPerfil: imagenPerfil,
                NombreCompleto: nombreCompleto,
                NombreUsuario: nombreUsuario,
                Rol: rol,
            },
          });
    };
    
    const VerAmigos = () => {
        history.push({
            pathname: `/veramigos/${nombreUsuario}`,
            state: {
                NombreUsuario: nombreUsuario,
            },
          });
    };

    return (
      <div>
            <body>
                <Navegacion/>

                <br></br>
                
                <div class="card body-content">

                    <div class="card card-user">

                        <div class="card card-picture border-secondary mb-3">
                            <img class="picture" src={location.state.ImagenPerfil} alt="Imagen de perfil"/>  
                            <br></br> 
                            <h2> {location.state.NombreUsuario} </h2>  
                        </div>
                        
                    </div>

                    <div class="card card-menu">
                        <div class="button-container">
                            <button class="btn btn-menu btn-outline-secondary">Torneos</button>
                            {location.state.Rol === 'Participante' && (
                                <button class="btn btn-menu btn-outline-secondary" onClick={VerAmigos}>Amigos</button>
                            )}

                            {location.state.Rol === 'Administrador' && (
                                <button class="btn btn-menu btn-outline-secondary">Crear Torneo</button>
                            )}

                            {location.state.Rol === 'SuperAdministrador' && (
                                <button class="btn btn-menu btn-outline-secondary">Gestionar</button>
                            )}
                            
                            <button class="btn btn-menu btn-outline-secondary" onClick={EditarPerfil}>Editar Perfil</button>
                            <button class="btn btn-menu btn-outline-secondary">
                                <a class="nav-link" href="/logout">Cerrar sesion</a>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </body>  
        </div>
    );
  }
  
  export default Perfil;
  