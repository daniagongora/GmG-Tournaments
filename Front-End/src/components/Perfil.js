import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MostrarImagenPerfil from "./MostrarImagen";
import Navegacion from "./Navegacion";

import "../statics/css/General.css";
import "../statics/css/Perfil.css";

function Perfil() {

    const history = useHistory();
    const location = useLocation();

    const idUsuario = location.state.ID;
    const nombreCompleto = location.state.NombreCompleto;
    const nombreUsuario = location.state.NombreUsuario;
    const correo = location.state.Correo;
    const imagenPerfil = location.state.ImagenPerfil;
    const rol = location.state.Rol;

    const VerTorneos = () => {

        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/verTorneos`,
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

    const CrearTorneo = () => {

        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/misTorneos`,
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

    const VerAmigos = () => {

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
    };

    const BuscarUsuario = () => {

        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/gestionar/buscarUsuario`,
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

    const EditarPerfil = () => {
        
        history.push({
            pathname: `/perfil${idUsuario}/${nombreUsuario}/editar`,
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
            <Navegacion/>   

            <div className="card body-content">
                <div className="row"> 
                    <div className="card card-user col-md">
                        <div className="card card-picture border-secondary mb-2">
                            <MostrarImagenPerfil imagen={location.state.ImagenPerfil} />
                        </div>

                        <div className="card card-username">
                            <h2 className="username"> {location.state.NombreUsuario} </h2>                          
                        </div>
                    </div>
                </div>
                
                <div className="row"> 
                    <div className="card card-menu col-md">
                        <div className="button-container">
                            <button className="btn btn-menu btn-outline-secondary" onClick={VerTorneos}>Torneos</button>

                            {location.state.Rol === 'Participante' && (
                                <button className="btn btn-menu btn-outline-secondary" onClick={VerAmigos}>Amigos</button>
                            )}

                            {location.state.Rol === "Administrador" && (
                                <button className="btn btn-menu btn-outline-secondary" onClick={CrearTorneo}>Crear Torneo</button>
                            )}

                            {location.state.Rol === 'SuperAdministrador' && (
                                <button className="btn btn-menu btn-outline-secondary" onClick={BuscarUsuario}>Gestionar</button>
                            )}
                            
                            <button className="btn btn-menu btn-outline-secondary" onClick={EditarPerfil}>Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}
  
export default Perfil;