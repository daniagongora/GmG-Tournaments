import React, { useState } from "react";
import { useParams } from "react-router-dom";

import MostrarImagenPerfil from "./MostrarImagen";
import Navegacion from "./Navegacion";
import Swal from 'sweetalert2';

import "../statics/css/General.css";
import '../statics/css/Alerta.css';
import "../statics/css/BuscarUsuario.css";

function BuscarUsuario(props){

    const { idUsuario } = useParams();
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
    const [idUsuarioBusqueda, setIDUsuarioBusqueda] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    const rol = props.location.state.Rol.toString();
    const [mensaje, setMensaje] = useState('');
    const [amigo, setEsAmigo] = useState('');
    const [solicitud, setSolicitud] = useState('');
    const [mismoUsuario, setMismoUsuario] = useState('');

    const BuscarUsuario = async (e) => { 

        e.preventDefault(); 

        const data = new FormData();
        data.append('NombreUsuario', usuarioBusqueda);

        let ruta;
        if (rol.toLowerCase() === 'participante') {
            ruta = `http://localhost:5000/participante/perfil${idUsuario}/${nombreUsuario}/amigos/buscarUsuario`;
        } else if (rol.toLowerCase() === 'superadministrador') {
            ruta  = `http://localhost:5000/superadministrador/perfil${idUsuario}/${nombreUsuario}/gestionar/buscarUsuario`
        } else {
            return;
        }

        try {
            const response = await fetch(ruta, {
                method: 'POST',
                body: data,
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                setMensaje('');
                setUsuario(responseData.NombreUsuario);
                setIDUsuarioBusqueda(responseData.ID)
                setNombre(responseData.NombreCompleto);
                setCorreo(responseData.Correo);
                setImagenPerfil(responseData.ImagenPerfil);
                setEsAmigo(responseData.Amigo);
                setSolicitud(responseData.solicitud);
                setMismoUsuario(responseData.MismoUsuario);
            } else {
                setMensaje(responseData.message || 'Error desconocido');
            }
        } catch (error) {
            setMensaje('Error de red. Inténtalo de nuevo.');
        }
    };

    const MandarSolicitud = async () => {

        const result = await Swal.fire({
            title: '¿Deseas enviarle una solicitud de amistad a este usuario?',
            icon: 'warning',
            text: '',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'custom-alert-container',
                title: 'custom-alert-title',
            },
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/participante/enviar_solicitud/${idUsuario}/${idUsuarioBusqueda}`, {
                    method: 'POST',
                });

                const responseData = await response.json();

                if (response.ok && responseData.success) {
                    setSolicitud(responseData.solicitud)
                    
                    Swal.fire({
                        title: 'Solicitud enviada exitosamente',
                        text: '',
                        icon: 'success',
                        customClass: {
                            container: 'custom-alert-container',
                            title: 'custom-alert-title',
                            text: 'custom-alert-text',
                            icon: 'custom-alert-icon',
                        },
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error al enviar la solicitud',
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
                    title: 'Ups! :(',
                    text: 'Ocurrió un problema con el servidor por favor intenta más tarde',
                    icon: 'error',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        icon: 'custom-alert-icon',
                    },
                });
            }
        }
    };

    const CancelarSolicitud = async (solicitante, receptor) => {

        try {
            const response = await fetch(`http://localhost:5000/participante/rechazar_amistad/${solicitante}/${receptor}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                const confirmar = await Swal.fire({
                    title: 'Solicitud cancelada',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Confirmar',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        text: 'custom-alert-text',
                        icon: 'custom-alert-icon',
                    },
                });

                if (confirmar.isConfirmed){
                    window.location.reload();
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al cancelar la solicitud',
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

    const VolverAdministrador = async () => {

        const result = await Swal.fire({
            title: '¿Seguro que deseas asignar a este usuario como administrador?',
            icon: 'warning',
            text: 'Esta es una acción irreversible',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            customClass: {
                container: 'custom-alert-container',
                title: 'custom-alert-title',
            },
        });
    
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/superadministrador/perfil${idUsuario}/volverAdministrador/${usuario.toString()}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                const responseData = await response.json();
    
                if (response.ok && responseData.success) {
                    const confirmar = await Swal.fire({
                        title: 'Usuario asignado como administrador',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        customClass: {
                        container: 'custom-alert-container',
                            title: 'custom-alert-title',
                            text: 'custom-alert-text',
                            icon: 'custom-alert-icon',
                        },
                    });

                    if (confirmar.isConfirmed) {
                        window.location.reload();
                    }
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrió un error al asignar como administrador',
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
                    title: 'Ups! :(',
                    text: 'Ocurrió un problema con el servidor por favor intenta más tarde',
                    icon: 'error',
                    customClass: {
                        container: 'custom-alert-container',
                        title: 'custom-alert-title',
                        icon: 'custom-alert-icon',
                    },
                });
            }
        }
    };

    return (

        <div>
            <Navegacion/>

            <div className="card body-content">
                <div className="row">
                    <h2 className="title">Buscar Usuario</h2>
                </div>

                <br></br>
                
                <div className="row-md mb-4 d-flex flex-md-row flex-column">
                    <form onSubmit={BuscarUsuario}>
                        <input className="form-control search col-md-3" type="text" value={usuarioBusqueda} placeholder="Ingresa el username" onChange={(e) => setUsuarioBusqueda(e.target.value)} />
                    </form>

                    <div className="col-md"></div>
                    
                    {rol === 'Participante' && !amigo === true && !solicitud === true && !mensaje && usuario && 
                    !mismoUsuario === true  &&(
                        <div className="col-md-3 buttons">
                            <button className="btn btn-participante btn-outline-secondary" onClick={MandarSolicitud}>Mandar Solicitud</button>
                        </div>
                    )}

                    {rol === 'Participante' && !amigo === true && !solicitud === false && !mensaje && usuario && (
                        <div className="col-md-3 buttons">
                            <button className="btn btn-participante btn-outline-danger" 
                                    onClick={() => CancelarSolicitud(parseInt(idUsuario), parseInt(idUsuarioBusqueda))}>Cancelar Solicitud</button>
                        </div>
                    )}

                    {rol === 'SuperAdministrador' && !mensaje && usuario && (
                        <div className="col-md-4 buttons">
                            <button className="btn btn-superadmin btn-outline-secondary"
                                    onClick={VolverAdministrador}>Asignar Administrador</button>
                        </div>
                    )}

                    {mensaje && <p>{mensaje}</p>}
                </div>

                {!mensaje && usuario && (
                    <div className="row mt-2">
                        <div className="card card-result border-secondary d-flex align-items-center justify-content-center flex-md-row flex-column">
                            <div className="card card-user col-md">
                                <div className="card card-picture border-secondary mb-4">
                                    <MostrarImagenPerfil imagen={imagenPerfil} />
                                </div>
                            </div>

                            <div className="card card-user-information col-md-8">
                                <div className="container-fluid d-flex align-items-center justify-content-center mt-3">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td> <h4>Nombre: </h4> </td>
                                                    <td> <h2>{nombre}</h2> </td>
                                                </tr>

                                                <tr>
                                                    <td> <h4>Username: </h4> </td>
                                                    <td> <h2>{usuario}</h2> </td>
                                                </tr>

                                                {rol === 'SuperAdministrador' && (
                                                    <tr>
                                                        <td> <h4>Correo: </h4> </td>
                                                        <td> <h2>{correo}</h2> </td>
                                                    </tr>   
                                                )} 
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>           
                )}
            </div>
        </div>
    );
}

export default BuscarUsuario;