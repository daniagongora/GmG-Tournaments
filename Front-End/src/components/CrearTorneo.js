import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Navegacion from "./Navegacion";
import Swal from "sweetalert2";

import "../statics/css/General.css";
import "../statics/css/Alerta.css";
import "../statics/css/CrearTorneo.css";

function CrearTorneo() {

  const history = useHistory();
  const location = useLocation();
  let today = new Date();

  const idUsuario = location.state.ID;
  const nombreCompleto = location.state.NombreCompleto;
  const nombreUsuario = location.state.NombreUsuario.toString();
  const correo = location.state.Correo;
  const imagenPerfil = location.state.ImagenPerfil;
  const rol = location.state.Rol;

  const [nombreTorneo, setNombreTorneo] = useState("");
  const fechaCreacion = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const [fechaInicio, setFechaInicio] = useState(fechaCreacion);
  const [cupoMaximo, setCupoMaximo] = useState(16);
  const [videojuego, setVideojuego] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState("");

  const [validNombreTorneo, setValidNombreTorneo] = useState(false);
  const [validFechaInicio, setValidFechaInicio] = useState(true);
  const [validCupoMaximo, setValidCupoMaximo] = useState(true);
  const [validVideojuego, setValidVideojuego] = useState(false);
  const [validPlataforma, setValidPlataforma] = useState(false);

  const listaVideojuegos = [
    "COD",
    "CS:GO",
    "Dota 2",
    "Fall Guys",
    "Fortnite",
    "HearthStone",
    "League of Legends",
    "Legends of Runeterra",
    "Mario Kart",
    "Minecraft",
    "Mortal Kombat",
    "Rocket League",
    "Smash Bros",
    "StarCraft II",
    "Valorant",
  ];

  const checkNombreTorneo = async (e) => {
    let tempNombre = e.target.value;
    setNombreTorneo(tempNombre);
    if (tempNombre.length > 120) setValidNombreTorneo(false);
    else setValidNombreTorneo(true);
  };

  const checkFechaInicio = (e) => {
    let tempFecha = e.target.value;
    setFechaInicio(tempFecha);
    if (tempFecha < fechaCreacion) setValidFechaInicio(false);
    else setValidFechaInicio(true);
  };

  const checkCupoMaximo = (e) => {
    let tempCupo = e.target.value;
    setCupoMaximo(tempCupo);
    if (Math.log2(tempCupo) % 1 === 0) setValidCupoMaximo(true);
    else setValidCupoMaximo(false);
  };

  const checkVideojuego = (e) => {
    let tempVideojuego = e.target.value;
    setVideojuego(tempVideojuego);
    if (tempVideojuego === "Selecciona una opcion") setValidVideojuego(false);
    else setValidVideojuego(true);
  };

  const checkPlataforma = (e) => {
    let tempPlataforma = e.target.value;
    setPlataforma(tempPlataforma);
    if (tempPlataforma.length > 100) setValidPlataforma(false);
    else setValidPlataforma(true);
  };

  const CrearTorneo = async (e) => {

    e.preventDefault();

    if (
      validNombreTorneo &&
      validFechaInicio &&
      validCupoMaximo &&
      validPlataforma &&
      validVideojuego
    ) {
      try {
        const data = new FormData();
        data.append("IDAdministrador", idUsuario);
        data.append("NombreTorneo", nombreTorneo);
        data.append("FechaInicio", fechaInicio);
        data.append("CupoMaximo", cupoMaximo);
        data.append("Videojuego", videojuego);
        data.append("Plataforma", plataforma);
        data.append("Descripcion", descripcion);
        data.append("FechaCreacion", fechaCreacion);

        const response = await fetch(
          `http://localhost:5000/torneo/perfil${idUsuario}/${nombreUsuario}/misTorneos/crearTorneo`,
          {
            method: "POST",
            body: data,
          }
        );

        const responseData = await response.json();

        if (responseData.success) {
          await Swal.fire({
            title: "Torneo creado exitosamente",
            text: "",
            icon: "success",
            customClass: {
              container: "custom-alert-container",
              title: "custom-alert-title",
              icon: "custom-alert-icon",
            },
          });
          
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
        } else {
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al intentar insertar el nuevo torneo",
            icon: "error",
            customClass: {
              container: "custom-alert-container",
              title: "custom-alert-title",
              icon: "custom-alert-icon",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error inesperado, por favor inténtalo más tarde",
          icon: "error",
          customClass: {
            container: "custom-alert-container",
            title: "custom-alert-title",
            icon: "custom-alert-icon",
          },
        });
      }
    }
  };

  return (

    <div>
      <body>
        <Navegacion />

        <div className="card body-content">
          <div class="row">
            <h2 class="title">Crear Torneo</h2>
          </div>

          <br></br>

          <div class="row">
            <form onSubmit={CrearTorneo}>
              <div class="table-responsive">
                <table class="table">
                  <tbody class="tbody">
                    <tr>
                      <td class="col-md-2"></td>

                      <td class="col-md">
                        <div class="form-group input-instance">
                          <label for="inputNombreTorneo" class="form-label mt-4">Nombre del Torneo</label>
                          <input type="text" 
                            class={
                              validNombreTorneo
                                ? "form-control is-valid entry-data"
                                : "form-control is-invalid entry-data"
                            }
                            id="inputNombreTorneo"
                            aria-describedby="NombreAyuda"
                            placeholder="Ex. Torneo #666"
                            value={nombreTorneo}
                            onChange={checkNombreTorneo}
                            required />
                          {!validNombreTorneo && (
                            <div class="invalid-feedback prompt-feedback">
                              El nombre no puede exceder 120 caracteres
                            </div>
                          )}
                        </div>

                        <div class="form-group input-instance">
                          <label for="inputFechaInicio" class="form-label mt-4">Fecha de Inicio</label>
                          <input type="date"
                            class={
                              validFechaInicio
                                ? "form-control is-valid entry-data"
                                : "form-control is-invalid entry-data"
                            }
                            id="inputFechaInicio"
                            aria-describedby="FechaAyuda"
                            value={fechaInicio} 
                            onChange={checkFechaInicio} />
                          {!validFechaInicio && (
                            <div class="invalid-feedback prompt-feedback">
                              La fecha de inicio no puede ser anterior al día actual
                            </div>
                          )}
                        </div>

                        <div class="form-group input-instance">
                          <label for="inputCupo" class="form-label mt-4">Cupo máximo de participantes</label>
                          <input type="number"
                            class={
                              validCupoMaximo
                                ? "form-control is-valid entry-data"
                                : "form-control is-invalid entry-data"
                            }
                            id="inputCupo"
                            aria-describedby="CupoAyuda"
                            value={cupoMaximo}
                            onChange={checkCupoMaximo} />
                          {!validCupoMaximo && (
                            <div class="invalid-feedback prompt-feedback">
                              Solo se aceptan valores que sean potencia de 2
                            </div>
                          )}
                        </div>

                        <div class="form-group input-instance">
                          <label for="inputVideojuego" class="form-label mt-4">Videojuego</label>
                          <select
                            class={
                              validVideojuego
                                ? "form-control is-valid entry-data"
                                : "form-control is-invalid entry-data"
                            }
                            value={videojuego}
                            onChange={checkVideojuego}
                            required
                            id="inputVideojuego">
                            <option>Selecciona una opción</option>

                            {listaVideojuegos.map((videojuego, index) => (
                              <option key={index}>{videojuego}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td class="col-md">
                        <div class="form-group input-instance">
                          <label for="inputPlataforma" class="form-label mt-4">Plataforma</label>
                          <input type="text"
                            class={
                              validPlataforma
                                ? "form-control is-valid entry-data"
                                : "form-control is-invalid entry-data"
                            }
                            id="inputPlataforma"
                            aria-describedby="PlataformaAyuda"
                            placeholder="Ex. Consola"
                            value={plataforma}
                            onChange={checkPlataforma}
                            required />
                          {!validPlataforma && (
                            <div class="invalid-feedback prompt-feedback">
                              Tienes un limite de hasta 100 caracteres
                            </div>
                          )}
                        </div>

                        <div class="form-group input-instance">
                          <label class="form-label mt-4" for="inputCreador">Creador</label>
                          <input
                            class="form-control entry-data"
                            id="Creador"
                            type="text"
                            readOnly
                            value={nombreUsuario} />
                        </div>

                        <div class="form-group input-instance">
                          <label for="inputDescripcion" class="form-label mt-4">Descripción</label>
                          <textarea
                            class="form-control entry-data description-area"
                            id="inputDescripcion"
                            rows="3"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </div>

                        <button type="submit" class="btn btn-create btn-outline-secondary">Crear Torneo</button>
                      </td>
                      
                      <td class="col-md-2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default CrearTorneo;