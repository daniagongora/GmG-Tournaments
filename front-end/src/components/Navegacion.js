import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './Navegacion.css';
import './General.css';

function Navegacion() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-secondary" data-bs-theme="dark">
                    <div class="navbar-content container-fluid">
                        <a class="navbar-brand">GmG Tournaments</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarColor01">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                <a class="nav-link" href="/perfil">Mi Perfil</a>
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