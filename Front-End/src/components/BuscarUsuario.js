import React, { useState } from "react";
import { useParams } from "react-router-dom";

import MostrarImagenPerfil from "./MostrarImagen";
import Navegacion from "./Navegacion";

import "../statics/css/General.css";
import "../statics/css/VerAmigos.css";

function BuscarUsuario(props){

    const { idUsuario } = useParams();
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
    const [imagenPerfil, setImagenPerfil] = useState('');
    const rol = props.location.state.Rol.toString();
    const [mensaje, setMensaje] = useState('');
    const [amigo, setEsAmigo] = useState('');

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
                setNombre(responseData.NombreCompleto);
                setCorreo(responseData.Correo);
                setImagenPerfil(responseData.ImagenPerfil);
                setEsAmigo(responseData.Amigo);
            } else {
                setMensaje(responseData.message || 'Error desconocido');
            }
        } catch (error) {
            setMensaje('Error de red. Inténtalo de nuevo.');
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
                    <h3>{rol}</h3>
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
                            
                            {rol === 'Participante' && !amigo === true && (
                                <button className="btn btn-outline-secondary">Mandar Solicitud</button>
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