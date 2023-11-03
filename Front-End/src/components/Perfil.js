import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../statics/css/Perfil.css';
import '../statics/css/General.css';
import Navegacion from './Navegacion';

function Perfil(){
    const location = useLocation();

    return(
        <div>
            <body>
                <Navegacion/>

                <br></br>
                
                <div class="card card-principal">

                    <div class="card card-user">

                        <div class="card card-picture border-secondary mb-3">
                            <img class="picture" src={location.state.ImagenPerfil} alt="Imagen de perfil"/>     
                        </div>

                        <div class="username">
                            <h2> {location.state.NombreUsuario} </h2>
                        </div>

                    </div>

                    <div class="card card-menu">
                        <div class="button-container">
                            <button class="btn btn-menu btn-outline-secondary">Torneos</button>
                            {location.state.Rol === 'Participante' && (
                                <button class="btn btn-menu btn-outline-secondary">Amigos</button>
                            )}

                            {location.state.Rol === 'Administrador' && (
                                <button class="btn btn-menu btn-outline-secondary">Crear Torneo</button>
                            )}

                            {location.state.Rol === 'SuperAdministrador' && (
                                <button class="btn btn-menu btn-outline-secondary">Gestionar</button>
                            )}
                            
                            <button class="btn btn-menu btn-outline-secondary">Editar Perfil</button>
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