import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import '../statics/css/General.css';
import '../statics/css/Navegacion.css';


function Navegacion() {

    const history = useHistory();
    const location = useLocation();

    const MiPerfil = () => {

        const idUsuario = location.state.ID;
        const nombreCompleto = location.state.NombreCompleto;
        const nombreUsuario = location.state.NombreUsuario;
        const correo = location.state.Correo;
        const imagenPerfil = location.state.ImagenPerfil;
        const rol = location.state.Rol

        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}`,
            state: {
                idUsuario,
                nombreCompleto,
                nombreUsuario,
                correo,
                imagenPerfil,
                rol,
            },
          });
    };

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
                                        <button className="nav-link" onClick={MiPerfil}>Mi Perfil</button>
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