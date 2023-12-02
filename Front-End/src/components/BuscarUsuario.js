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
            console.error('Rol no reconocido');
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

    return (

        <body>
            <Navegacion/>
            <div className="card body-content">
                <div class="row">
                    <h2 class="title">Buscar Usuario</h2>
                </div>

                <br></br>
                
                <div class="row-md mb-4 d-flex flex-md-row flex-column">

                    <form onSubmit={BuscarUsuario}>
                        <input class="form-control search col-md-3" type="text" value={usuarioBusqueda} placeholder="Ingresa el username" onChange={(e) => setUsuarioBusqueda(e.target.value)} />
                    </form>

                    <div class="col-md"></div>
                    
                    {rol === 'Participante' && !amigo === true && !solicitud === true && !mensaje && usuario && (
                        <div class="col-md-3 buttons">
                            <button className="btn btn-participante btn-outline-secondary" onClick={MandarSolicitud}>Mandar Solicitud</button>
                        </div>
                    )}

                    {rol === 'Participante' && !amigo === true && !solicitud === false && !mensaje && usuario &&(
                        <div class="col-md-3 buttons">
                            <button className="btn btn-participante btn-outline-danger" 
                                onClick={() => CancelarSolicitud(parseInt(idUsuario), parseInt(idUsuarioBusqueda))}>Cancelar Solicitud</button>
                        </div>
                    )}

                    {rol === 'SuperAdministrador' && !mensaje && usuario &&(
                        <div class="col-md-4 buttons">
                            <button className="btn btn-superadmin btn-outline-secondary">Asignar Administrador</button>
                        </div>
                    )}

                    {mensaje && <p>{mensaje}</p>}
                </div>

                {!mensaje && usuario && (
                    

                    <div class="row mt-2">

                        <div class="card card-result border-secondary d-flex align-items-center justify-content-center flex-md-row flex-column">
                            <div class="card card-user col-md">
                                <div class="card card-picture border-secondary mb-4">
                                        <MostrarImagenPerfil imagen={imagenPerfil} />
                                </div>
                            </div>

                            <div class="card card-user-information col-md-8">
                                <div class="container-fluid d-flex align-items-center justify-content-center mt-3">
                                    <div class="table-responsive">
                                        <table class="table">
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
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>           
                )}

            </div>
        </body>
    );
}

export default BuscarUsuario;