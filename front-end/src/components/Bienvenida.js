import React from 'react';

function Bienvenida({ nombreUsuario }) { //yo creo que lo ideal ahi es que muestre el nombre del usuario
  return (
    <div>
      <h2>Bienvenid@ {nombreUsuario}</h2>
      <p>¡Has iniciado sesión con éxito!</p>
    </div>
  );
}

export default Bienvenida;
