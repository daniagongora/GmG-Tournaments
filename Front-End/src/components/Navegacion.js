import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../statics/css/Navegacion.css';
import '../statics/css/General.css';

function Navegacion() {

    const location = useLocation();
    const nombreUsuario = location.state.NombreUsuario.toString();

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                    <div class="navbar-content container-fluid">
                        <a class="navbar-brand">GmG Tournaments</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarColor02">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                <a class="nav-link" href={`/perfil/${nombreUsuario}`}>Mi Perfil</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="/logout">Cerrar Sesion</a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </nav>
        </div> 
    );
}

export default Navegacion;