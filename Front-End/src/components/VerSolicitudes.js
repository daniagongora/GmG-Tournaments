import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import MostrarImagenPerfil from './MostrarImagen';
import Navegacion from './Navegacion';
import Swal from 'sweetalert2';

import '../statics/css/General.css';
import '../statics/css/Alerta.css';
import '../statics/css/VerAmigos.css';

function VerSolicitudes(props) {

    const history = useHistory();
    const location = useLocation();

    const { idUsuario } = useParams();
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const rol = location.state.Rol;

    const [solicitudes, setSolicitudes] = useState([]);
    useEffect(() => {
        const obtenerSolicitudes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/participante/perfil${idUsuario}/${nombreUsuario}/solicitudes`);
                const data = await response.json();

                if (data.success) {
                    setSolicitudes(data.solicitudes);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error al obtener la lista de solicitudes',
                        icon: 'error',
                        customClass: {
                            container: 'custom-alert-container',
                            title: 'custom-alert-title',
                            icon: 'custom-alert-icon',
                        },
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error con el servidor al obtener la lista de solicitudes',
                    icon: 'error',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        icon: 'custom-alert-icon',
                    },
                });
            }
        };

        obtenerSolicitudes();
    }, [idUsuario, nombreUsuario]);

    const AceptarSolicitud = async (solicitante, receptor) => {
        try {
            const response = await fetch(`http://localhost:5000/participante/aceptar_amistad/${solicitante}/${receptor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: 'Solicitud aceptada',
                    icon: 'success',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        text: 'custom-alert-text',
                        icon: 'custom-alert-icon',
                    },
                });

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
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al aceptar la solicitud',
                    icon: 'error',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        icon: 'custom-alert-icon',
                    },
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error con el servidor',
                icon: 'error',
                customClass: {
                    container: 'custom-alert-container',
                    title: 'custom-alert-title',
                    icon: 'custom-alert-icon',
                },
            });
        }
    };

    const RechazarSolicitud = async (solicitante, receptor) => {
        try {
            const response = await fetch(`http://localhost:5000/participante/rechazar_amistad/${solicitante}/${receptor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: 'Solicitud rechazada',
                    icon: 'success',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        text: 'custom-alert-text',
                        icon: 'custom-alert-icon',
                    },
                });

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
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al rechazar la solicitud',
                    icon: 'error',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        icon: 'custom-alert-icon',
                    },
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error con el servidor',
                icon: 'error',
                customClass: {
                    container: 'custom-alert-container',
                    title: 'custom-alert-title',
                    icon: 'custom-alert-icon',
                },
            });
        }
    };

    return (

        <div>
            <body>
                <Navegacion />

                <div className="card body-content">
                    <div className="row">
                        <h2 className="title">Solicitudes de amistad</h2>
                    </div>

                    <div className="row">
                        <div className="card card-user col-md-4 d-flex align-items-center">
                            <div className="card card-picture border-secondary mb-2">
                                <MostrarImagenPerfil imagen={location.state.ImagenPerfil}/>
                            </div>

                            <div className="card card-username text-center ms-3">
                                <h2 className="user"> {location.state.NombreUsuario} </h2>
                            </div>
                        </div>

                        <div className="card card-list col-md-8">
                            {solicitudes && solicitudes.length === 0 ? (
                                <div className="card card-empty container-fluid border-secondary d-flex align-items-center justify-content-center">
                                    <h2 className="card-empty-message">Aun no te han llegado solicitudes</h2>
                                </div>
                            ) : (
                                <div className="card card-friends container-fluid border-secondary">
                                    <ul className="list row">
                                        {solicitudes && solicitudes.length > 0 && solicitudes.map((amigo) => (
                                            <li key={amigo.NombreParticipante} className="list-item col-md-12">
                                                <div className="row align-items-center">
                                                    <div className="col-md-8 d-flex align-items-center">
                                                        <div className="card list-image-container border-secondary">
                                                            <MostrarImagenPerfil imagen={amigo.ImagenPerfil} />
                                                        </div>
                                                        <span><h4 className="list-name ms-3">{amigo.NombreParticipante}</h4></span>
                                                    </div>
                                        
                                                    <div className="col-md-4">
                                                        <button className="btn btn-success me-2" onClick={() => 
                                                            AceptarSolicitud(parseInt(amigo.IDSolicitante.toString()), parseInt(idUsuario))}>Aceptar</button>
                                            
                                                        <button className="btn btn-danger" onClick={() => 
                                                            RechazarSolicitud(parseInt(amigo.IDSolicitante.toString()), parseInt(idUsuario))}>Rechazar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default VerSolicitudes;