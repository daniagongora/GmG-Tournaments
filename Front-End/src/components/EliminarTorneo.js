import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Navegacion from "./Navegacion";
import Swal from "sweetalert2";

import "../statics/css/General.css";
import "../statics/css/Alerta.css";
// import "../statics/css/EliminarTorneo.css";

function EliminarTorneo() {
  const history = useHistory();
  const location = useLocation();

  //Cargamos en variables los parametros que recibe de la pantalla anterior
  const idUsuario = location.state.ID;
  const nombreCompleto = location.state.NombreCompleto;
  const nombreUsuario = location.state.NombreUsuario.toString();
  const correo = location.state.Correo;
  const imagenPerfil = location.state.ImagenPerfil;
  const rol = location.state.Rol;

  //Variables con useState
  const [listaTorneos, setListaTorneos] = useState([]);

  useEffect(() => {
    const obtenerTorneos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/torneo/${idUsuario}/eliminar`,
          {
            method: "GET",
          }
        );
        const responseData = await response.json();

        setListaTorneos(responseData.torneos);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error con el servidor, intentalo mas tarde",
          icon: "error",
          customClass: {
            container: "custom-alert-container",
            title: "custom-alert-title",
            icon: "custom-alert-icon",
          },
        });
        console.log(error);
      }
    };

    obtenerTorneos();
  }, [idUsuario]);

  const HandleDelete = async (e) => {
    let torneoAEliminar = e.target.value;
    const data = new FormData();
    data.append("IDTorneo", torneoAEliminar);
    try {
      const response = await fetch(
        `http://localhost:5000/torneo/${idUsuario}/eliminar`,
        {
          method: "POST",
          body: data,
        }
      );
      const responseData = await response.json();

      if (responseData.success) {
        await Swal.fire({
          title: "Éxito!",
          text: `Se elimino el torneo #${torneoAEliminar} correctamente`,
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
        text: "Ocurrió un error con el servidor, intentalo mas tarde",
        icon: "error",
        customClass: {
          container: "custom-alert-container",
          title: "custom-alert-title",
          icon: "custom-alert-icon",
        },
      });
      console.log(error);
    }

    console.log(e.target.value);
  };

  return (
    <body>
      <Navegacion />

      <div className="card body-content">
        <div class="row">
          <h2 class="title">Eliminar Torneo</h2>
        </div>
        <br></br>

        {listaTorneos.length == 0 ? (
          <div>
            <h3 class="text-info">
              No se encontró ningún torneo creado por ti :(
            </h3>
            <br></br>
            <h3 class="text-info">
              Ve a la sección <strong>Crear Torneo</strong> y genera tu primer
              torneo!
            </h3>
          </div>
        ) : (
          <div class="row">
            <h5>
              A continuación se muestran los torneos que son de
              <strong> tu autoría</strong>.
            </h5>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Torneo ID</th>
                  <th scope="col">Nombre del Torneo</th>
                  <th scope="col">Videojuego</th>
                  <th scope="col">Creado</th>
                  <th scope="col">Inicio</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {listaTorneos.map((torneo, index) => (
                  <tr class="table-primary" key={index}>
                    <th scope="row">{torneo.IDTorneo}</th>
                    <td>{torneo.NombreTorneo}</td>
                    <td>{torneo.Videojuego}</td>
                    <td>{torneo.FechaCreacion}</td>
                    <td>{torneo.FechaInicio}</td>
                    <td>{torneo.Estatus ? "Activo" : "Terminado"}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={HandleDelete}
                        value={torneo.IDTorneo}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </body>
  );
}

export default EliminarTorneo;
