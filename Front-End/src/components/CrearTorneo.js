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

  //Cargamos en variables los parametros que recibe de la pantalla anterior
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
  //Variables para validar los campos
  const [validNombreTorneo, setValidNombreTorneo] = useState(false);
  const [validFechaInicio, setValidFechaInicio] = useState(true);
  const [validCupoMaximo, setValidCupoMaximo] = useState(true);
  const [validVideojuego, setValidVideojuego] = useState(false);
  const [validPlataforma, setValidPlataforma] = useState(false);

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
    if (tempVideojuego.length > 100) setValidVideojuego(false);
    else setValidVideojuego(true);
  };

  const checkPlataforma = (e) => {
    let tempPlataforma = e.target.value;
    setPlataforma(tempPlataforma);
    if (tempPlataforma.length > 100) setValidPlataforma(false);
    else setValidPlataforma(true);
  };

  // const checkFechaInicio = ()

  const handleSubmit = async (e) => {
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

        const response = await fetch("http://localhost:5000/torneo/crear", {
          method: "POST",
          body: data,
        });

        const responseData = await response.json();

        if (responseData.success) {
          await Swal.fire({
            title: "Éxito!",
            text: "Se creo el nuevo torneo correctamente",
            icon: "success",
            customClass: {
              container: "custom-alert-container",
              title: "custom-alert-title",
              icon: "custom-alert-icon",
            },
          });
          //Aqui va salir un error porque ya no hay modo de regresar los datos que se obtivieron en login
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
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error inesperado, por favor intentalo mas tarde",
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
    <body>
      <Navegacion />

      <div className="card body-content">
        <div class="row">
          <h2 class="title">Crear Torneo</h2>
        </div>

        <div class="row">
          <form onSubmit={handleSubmit}>
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
                        required
                      />
                      {!validNombreTorneo && (
                        <div class="invalid-feedback prompt-feedback">
                          El nombre no puede exceder 120 caracteres
                        </div>
                      )}
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputFechaInicio" class="form-label mt-4">
                        Fecha Inicio
                      </label>
                      <input
                        type="date"
                        value={fechaInicio}
                        onChange={checkFechaInicio}
                        class={
                          validFechaInicio
                            ? "form-control is-valid entry-data"
                            : "form-control is-invalid entry-data"
                        }
                        id="inputFechaInicio"
                        aria-describedby="FechaAyuda"
                      />
                      {!validFechaInicio && (
                        <div class="invalid-feedback prompt-feedback">
                          La fecha de inicio no puede ser anterior al día actual
                        </div>
                      )}
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputCupo" class="form-label mt-4">
                        Cupo máximo de participantes
                      </label>
                      <input
                        type="number"
                        class={
                          validCupoMaximo
                            ? "form-control is-valid entry-data"
                            : "form-control is-invalid entry-data"
                        }
                        id="inputCupo"
                        aria-describedby="CupoAyuda"
                        value={cupoMaximo}
                        onChange={checkCupoMaximo}
                      />
                      {!validCupoMaximo && (
                        <div class="invalid-feedback prompt-feedback">
                          Solo se aceptan valores que sean potencia de 2
                        </div>
                      )}
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputVideojuego" class="form-label mt-4">
                        Videojuego*
                      </label>
                      <input
                        type="text"
                        class={
                          validVideojuego
                            ? "form-control is-valid entry-data"
                            : "form-control is-invalid entry-data"
                        }
                        id="inputVideojuego"
                        aria-describedby="VideojuegoAyuda"
                        placeholder="Ex. Smash Bros"
                        value={videojuego}
                        onChange={checkVideojuego}
                        required
                      />
                      {!validVideojuego && (
                        <div class="invalid-feedback prompt-feedback">
                          Tienes un limite de hasta 100 caracteres
                        </div>
                      )}
                    </div>

                    <div class="form-group input-instance">
                      <label for="inputPlataforma" class="form-label mt-4">
                        Plataforma*
                      </label>
                      <input
                        type="text"
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
                        required
                      />
                      {!validPlataforma && (
                        <div class="invalid-feedback prompt-feedback">
                          Tienes un limite de hasta 100 caracteres
                        </div>
                      )}
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
