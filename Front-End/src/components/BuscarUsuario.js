import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import MostrarImagenPerfil from "./MostrarImagen";
import Navegacion from "./Navegacion";
import Swal from 'sweetalert2';

import "../statics/css/General.css";
import "../statics/css/VerAmigos.css";

function BuscarUsuario(props){

    const history = useHistory();

    const { idUsuario } = useParams();
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const nombreCompleto = props.location.state.NombreCompleto.toString();
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

        <div>
            <body>
                <Navegacion/>
                <br></br>
            
                <form onSubmit={BuscarUsuario}>
                    <label>Nombre:
                        <input type="text" value={usuarioBusqueda} onChange={(e) => setUsuarioBusqueda(e.target.value)} />
                    </label>
                    <button type="submit">Buscar</button>
                </form>

                <br></br>

                {mensaje && <p>{mensaje}</p>}

                <br></br>

                {!mensaje && usuario && (
                    <div class="card text-white bg-primary mb-3">
                        <div class="card-body">
                            <MostrarImagenPerfil imagen={imagenPerfil} />

                            <tr>
                                <td> <h5>Username: </h5> </td>
                                <td> <h3>{usuario}</h3> </td>
                            </tr>

                            <br></br>

                            <tr>
                                <td> <h5>Nombre: </h5> </td>
                                <td> <h3>{nombre}</h3> </td>
                            </tr>

                            <br></br>

                            {rol === 'SuperAdministrador' && (
                                <tr>
                                    <td> <h5>Correo: </h5> </td>
                                    <td> <h3>{correo}</h3> </td>
                                </tr>   
                            )}
                            
                            {rol === 'Participante' && !amigo === true && !solicitud === true && (
                                <button className="btn btn-outline-secondary" onClick={MandarSolicitud}>Mandar Solicitud</button>
                            )}

                            {rol === 'Participante' && !amigo === true && !solicitud === false && (
                                <button className="btn btn-danger" 
                                        onClick={() => CancelarSolicitud(parseInt(idUsuario), parseInt(idUsuarioBusqueda))}>Cancelar Solicitud</button>
                            )}

                            {rol === 'SuperAdministrador' && (
                                <button className="btn btn-outline-secondary">Asignar Administrador</button>
                            )}

                            <br></br>
                        </div>
                    </div>               
                )}
            </body>
        </div>
    );
}

export default BuscarUsuario;