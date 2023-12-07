import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Navegacion from "./Navegacion";
import Swal from "sweetalert2";

import "../statics/css/General.css";
import "../statics/css/Alerta.css";
import "../statics/css/EliminarTorneo.css";

function EliminarTorneo() {

  const history = useHistory();
  const location = useLocation();

  const idUsuario = location.state.ID;
  const nombreCompleto = location.state.NombreCompleto;
  const nombreUsuario = location.state.NombreUsuario.toString();
  const correo = location.state.Correo;
  const imagenPerfil = location.state.ImagenPerfil;
  const rol = location.state.Rol;

  const [listaTorneos, setListaTorneos] = useState([]);
  useEffect(() => {

    const obtenerMisTorneos = async () => {

      try {
        const response = await fetch(
          `http://localhost:5000/torneo/perfil${idUsuario}/${nombreUsuario}/misTorneos`,
          {
            method: "GET",
          }
        );

        const responseData = await response.json();

        setListaTorneos(responseData.torneos);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error con el servidor, inténtalo más tarde",
          icon: "error",
          customClass: {
            container: "custom-alert-container",
            title: "custom-alert-title",
            icon: "custom-alert-icon",
          },
        });
      }
    };

    obtenerMisTorneos();
  }, [idUsuario, nombreUsuario]);

  const EliminarTorneo = async (e) => {

    let torneoAEliminar = e.target.value;
    const data = new FormData();
    data.append("IDTorneo", torneoAEliminar);

    try {
      const response = await fetch(
        `http://localhost:5000/torneo/perfil${idUsuario}/${nombreUsuario}/misTorneos`,
        {
          method: "POST",
          body: data,
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        await Swal.fire({
          title: `Torneo #${torneoAEliminar} eliminado exitosamente`,
          icon: "success",
          customClass: {
            container: "custom-alert-container",
            title: "custom-alert-title",
            icon: "custom-alert-icon",
          },
        });

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
      } else throw new Error("El torneo a eliminar no existe");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error con el servidor, inténtalo más tarde",
        icon: "error",
        customClass: {
          container: "custom-alert-container",
          title: "custom-alert-title",
          icon: "custom-alert-icon",
        },
      });
    }
  };

  const CrearTorneo = () => {
    
    history.push({
      pathname: `/perfil${idUsuario}/${nombreUsuario}/misTorneos/crearTorneo`,
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
      <body>
        <Navegacion />

        <div className="card body-content ">
          <div class="row">
            <h2 class="title">Mis Torneos</h2>
          </div>

          <div class="row">
            <button class="btn btn-outline-secondary btn-create-tournament" onClick={CrearTorneo}>Nuevo Torneo</button>
          </div>

          {listaTorneos.length === 0 ? (
            <div class="card card-empty container-fluid border-secondary d-flex align-items-center justify-content-center">
              <h2 class= "card-empty-tournaments">Aun no tienes torneos creados</h2>
            </div>
          ) : (
            <div class="card card-table table-responsive border-secondary">
              <table class="table table-hover">
                <thead class="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Videojuego</th>
                    <th scope="col">Creado</th>
                    <th scope="col">Inicio</th>
                    <th scope="col">Estatus</th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {listaTorneos.map((torneo, index) => (
                    <tr class="table" key={index}>
                      <th scope="row">{torneo.IDTorneo}</th>
                      <td>{torneo.NombreTorneo}</td>
                      <td>{torneo.Videojuego}</td>
                      <td>{torneo.FechaCreacion}</td>
                      <td>{torneo.FechaInicio}</td>
                      <td>{torneo.Estatus ? "Activo" : "Terminado"}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-delete-tournament"
                          onClick={EliminarTorneo}
                          value={torneo.IDTorneo}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </body>
    </div>
  );
}

export default EliminarTorneo;