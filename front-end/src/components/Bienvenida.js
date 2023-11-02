import React from 'react';

function Bienvenida({ nombreUsuario }) {
  return (
    <div>
      <h2>Bienvenid@ {nombreUsuario}</h2>
      <p>¡Has iniciado sesión con éxito!</p>
    </div>
  );
}

export default Bienvenida;