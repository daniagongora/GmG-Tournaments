import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import '../statics/css/General.css';
import '../statics/css/Navegacion.css';

function Navegacion() {

    const history = useHistory();
    const location = useLocation();

    const idUsuario = location.state.ID;
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = location.state.NombreUsuario;
    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const rol = location.state.Rol

    const MiPerfil = () => {
        
        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}`,
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
            <div className="card body-content">
                <nav className="navbar navbar-expand-md bg-dark" data-bs-theme="dark">
                    <div className="navbar-content container-fluid">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="navbar-brand">GmG Tournaments</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={MiPerfil}>Mi Perfil</button>
                                </li>
                                
                                <li className="nav-item">
                                    <a className="nav-link" href="/logout">Cerrar Sesión</a>
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