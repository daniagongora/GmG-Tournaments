import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navegacion from './Navegacion';

import '../statics/css/General.css';
import '../statics/css/BuscarUsuario.css';


function BuscarUsuario(props){
    const { idUsuario } = useParams();
    const nombreUsuario = props.location.state.NombreUsuario.toString();
    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [usuarioBusqueda, setUsuarioBusqueda] = useState('');
    const [rol, setRol] = useState('');
    const [imagen, setImagenPerfil] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        const data = new FormData();
        data.append('NombreUsuario', usuarioBusqueda);

        try {
            const response = await fetch(`http://localhost:5000/participante/perfil${idUsuario}/${nombreUsuario}/buscarUsuario`, {
                method: 'POST',
                body: data,
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Busqueda exitosa, muestra los datos del usuario encontrado
                setMensaje('');
                setUsuario(responseData.NombreUsuario);
                setNombre(responseData.NombreCompleto);
                setRol(responseData.Rol);
                setImagenPerfil(responseData.ImagenPerfil);
            } else {
                // Muestra el mensaje de error
                setMensaje(responseData.message || 'Error desconocido');
            }
        } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        setMensaje('Error de red. Inténtalo de nuevo.');
        }
    };

  return (

    <div>
        <body>
            <Navegacion/>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>
                Nombre:
                <input type="text" value={usuarioBusqueda} onChange={(e) => setUsuarioBusqueda(e.target.value)} />
                </label>
                <button type="submit">Buscar</button>
            </form>
            <br></br>
            {mensaje && <p>{mensaje}</p>}
            <br></br>
            {!mensaje && usuario && (
                <div class="card text-white bg-primary mb-3">
                    <div class="card-header">Resultados de Búsqueda</div>
                    <div class="card-body">
                        <tr>
                        <td> <h5>Username:</h5> </td>
                        <td> <h3>{usuario}</h3> </td>
                        </tr>

                        <br></br>

                        <tr>
                        <td> <h5>Nombre:</h5> </td>
                        <td> <h3>{nombre}</h3> </td>
                        </tr>

                        <br></br>
                    </div>
                    
                </div>               
            )}
      </body>
    </div>
  );
}

export default BuscarUsuario;