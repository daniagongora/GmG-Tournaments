import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navegacion from "./Navegacion";
import MostrarTorneo from "./MostrarTorneo";
import Swal from "sweetalert2";

import "../statics/css/General.css";
import "../statics/css/Alerta.css";
import "../statics/css/VerTorneos.css";

function VerTorneos() {
  
  const location = useLocation();

  const idUsuario = location.state.ID;
  const nombreUsuario = location.state.NombreUsuario.toString();

  const [torneos, setTorneos] = useState([]);
  useEffect(() => {

    const obtenerTorneos = async () => {
      
      try {
        const response = await fetch(`http://localhost:5000/torneo/perfil${idUsuario}/${nombreUsuario}/verTorneos`, {
          method: "GET",
        });

        const responseData = await response.json();

        setTorneos(responseData.torneos);
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

    obtenerTorneos();
  }, [idUsuario, nombreUsuario]);

  const EntrarTorneo = async (e) => {
    
  };

  return (

    <div>
      <body>
        <Navegacion />

        <div className="card body-content ">
          <div class="row">
            <h2 class="title">Torneos</h2>
          </div>

          <br></br>

          <div class="row tournaments">
            {torneos.map((torneo, index) => (
              <div class="card border-secondary mb-4 tournament-card col-md-4" key={index}>
                <div class="card-header tournament-header">
                  <MostrarTorneo videojuego={torneo.Videojuego} />
                </div>

                <div class="card-body">
                  <h4 class="card-title text-center">{torneo.NombreTorneo}</h4>
                  <button type="button"
                          class="btn btn-outline-secondary btn-lg"
                          value={torneo.IDTorneo}
                          onClick={EntrarTorneo}>Entrar a Torneo</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default VerTorneos;