import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './Vapor.css';

function Navegacion(){
    return (
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand">GmG Tournaments</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                <a class="nav-link active" href="/MiPerfil">MiPerfil
                    <span class="visually-hidden">(current)</span>
                </a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/MiPerfil">Amigos</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/MiPerfil">Torneos</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/MiPerfil">Buscar usuario</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
      );
}

export default Navegacion;