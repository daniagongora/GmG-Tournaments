import React from 'react';
import { useLocation } from "react-router-dom";

import '../statics/css/General.css';
import '../statics/css/Navegacion.css';

function Navegacion() {

    const location = useLocation();
    const nombreUsuario = location.state.NombreUsuario.toString();

    return (
        <div>

            <div class="card body-content">
                <nav class="navbar navbar-expand-md bg-dark" data-bs-theme="dark">
                        <div class="navbar-content container-fluid">
                            <a class="navbar-brand" href="/">GmG Tournaments</a>
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
        </div> 
    );
}

export default Navegacion;