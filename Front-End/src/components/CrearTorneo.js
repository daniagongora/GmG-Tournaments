import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";

import Navegacion from "./Navegacion";
import Swal from "sweetalert2";

import "../statics/css/General.css";
import "../statics/css/Alerta.css";
import "../statics/css/CrearTorneo.css";

function CrearTorneo(props) {
  //Cargamos en variables los parametros que recibe de la pantalla anterior
  const nombreUsuario = props.location.state.NombreUsuario.toString();
  const idUsuario = props.location.state.ID;
  let today = new Date();

  const [nombreTorneo, setNombreTorneo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );
  const [cupoMaximo, setCupoMaximo] = useState(16);
  const [videojuego, setVideojuego] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("IDAdministrador", idUsuario);
    data.append("NombreTorneo", nombreTorneo);
    data.append("FechaInicio", fechaInicio);
    data.append("CupoMaximo", cupoMaximo);
    data.append("Videojuego", videojuego);
    data.append("Plataforma", plataforma);
    data.append("Descripcion", descripcion);

    try {
      const response = await fetch("http://localhost:5000/crearTorneo", {
        method: "POST",
        body: data,
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log("YEAH");
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
        text: "Ocurrió un error con el servidor al obtener la lista de amigos",
        icon: "error",
        customClass: {
          container: "custom-alert-container",
          title: "custom-alert-title",
          icon: "custom-alert-icon",
        },
      });
    }
  };

  return (
    <body>
      <Navegacion />

      <div className="card body-content">
        <div class="row">
          <h2 class="title">Crear Torneo</h2>
        </div>

        <div class="row">
          <form>
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    <div class="form-group input-instance">
                      <label for="inputNombreTorneo" class="form-label mt-4">
                        Nombre del Torneo*
                      </label>
                      <input
                        type="text"
                        class="form-control entry-data"
                        id="inputNombreTorneo"
                        aria-describedby="NombreAyuda"
                        placeholder="Ex. Torneo #666"
                        value={nombreTorneo}
                        onChange={(e) => setNombreTorneo(e.target.value)}
                      />
                      <small id="nombreTorneoHint" class="form-text text-muted">
                        Campo del torneo
                      </small>
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputFechaInicio" class="form-label mt-4">
                        Fecha Inicio
                      </label>
                      <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        class="form-control entry-data"
                        id="inputFechaInicio"
                        aria-describedby="FechaAyuda"
                      />
                      <small id="fechaInicioHint" class="form-text text-muted">
                        Por default es la fecha actual
                      </small>
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputCupo" class="form-label mt-4">
                        Cupo máximo de participantes
                      </label>
                      <input
                        type="number"
                        class="form-control entry-data"
                        id="inputCupo"
                        aria-describedby="CupoAyuda"
                        value={cupoMaximo}
                        onChange={(e) => setCupoMaximo(e.target.value)}
                      />
                      <small id="CupoHint" class="form-text text-muted">
                        No. máximo de jugadores aceptados
                      </small>
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputVideojuego" class="form-label mt-4">
                        Videojuego*
                      </label>
                      <input
                        type="text"
                        class="form-control entry-data"
                        id="inputVideojuego"
                        aria-describedby="VideojuegoAyuda"
                        placeholder="Ex. Smash Bros"
                        value={videojuego}
                        onChange={(e) => setVideojuego(e.target.value)}
                      />
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputPlataforma" class="form-label mt-4">
                        Plataforma*
                      </label>
                      <input
                        type="text"
                        class="form-control entry-data"
                        id="inputPlataforma"
                        aria-describedby="PlataformaAyuda"
                        placeholder="Ex. Consola"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                      />
                    </div>
                  </td>

                  <td>
                    <div class="form-group input-instance">
                      <label class="form-label mt-4" for="inputCreador">
                        Creador
                      </label>
                      <input
                        class="form-control entry-data"
                        id="Creador"
                        type="text"
                        readOnly
                        value={nombreUsuario}
                      />
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputDescripcion" class="form-label mt-4">
                        Descripción
                      </label>
                      <textarea
                        class="form-control entry-data description-area"
                        id="inputDescripcion"
                        rows="3"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-login btn-outline-secondary "
                    >
                      Crear
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </body>
  );
}

export default CrearTorneo;
