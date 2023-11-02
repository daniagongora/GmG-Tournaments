import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import './Perfil.css'
import './General.css';
import Navegacion from './Navegacion';

function PerfilParticipante(){
    const location = useLocation();

    return(
        <div>
            <body>
                <Navegacion/>

                <br></br>
                
                <div class="card card-principal border-primary mb-3">

                    <div class="card card-user border-primary mb-3">

                        <div class="card card-picture border-primary mb-3">
                        </div>

                        <div class="username">
                            <h2> {location.state.nombre_usuario} </h2>
                        </div>

                    </div>

                    <div class="card card-menu border-primary mb-3">
                        <div class="button-container">
                            <button class="btn btn-menu btn-outline-secondary">Torneos</button>
                            <button class="btn btn-menu btn-outline-secondary">Amigos</button>
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

export default PerfilParticipante;