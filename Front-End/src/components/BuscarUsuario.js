import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navegacion from './Navegacion';

import imagen1 from '../statics/icons/crash.png';
import imagen2 from '../statics/icons/dave.jpg';
import imagen3 from '../statics/icons/doge.jpg';
import imagen4 from '../statics/icons/ender.jpg';
import imagen5 from '../statics/icons/fallguy.jpg';
import imagen6 from '../statics/icons/freddy.png';
import imagen7 from '../statics/icons/kirby.jpg';
import imagen8 from '../statics/icons/papitas.png';
import imagen9 from '../statics/icons/pingu.jpg';
import imagen10 from '../statics/icons/spidergwen.png';
import imagen11 from '../statics/icons/spidermiles.jpg';
import imagen12 from '../statics/icons/tracer.jpg';
import imagen13 from '../statics/icons/icon.png';
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
    const [amigo, setEsAmigo] = useState('');

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
                setEsAmigo(responseData.Amigo);
            } else {
                // Muestra el mensaje de error
                setMensaje(responseData.message || 'Error desconocido');
            }
        } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        setMensaje('Error de red. Inténtalo de nuevo.');
        }
    };
    function mostrarImagenPerfil() {
        if (imagen === '../statics/icons/icon.png') {
            return imagen13;
        } else if (imagen === '../statics/icons/crash.png') {
            return imagen1;
        }  else if (imagen === '../statics/icons/dave.jpg') {
            return imagen2;
        }  else if (imagen === '../statics/icons/doge.jpg') {
            return imagen3;
        }  else if (imagen === '../statics/icons/ender.jpg') {
            return imagen4;
        }  else if (imagen === '../statics/icons/fallguy.jpg') {
            return imagen5;
        }  else if (imagen === '../statics/icons/freddy.png') {
            return imagen6;
        }  else if (imagen === '../statics/icons/kirby.jpg') {
            return imagen7;
        }  else if (imagen === '../statics/icons/papitas.png') {
            return imagen8;
        }  else if (imagen === '../statics/icons/pingu.jpg') {
            return imagen9;
        }  else if (imagen === '../statics/icons/spidergwen.png') {
            return imagen10;
        }  else if (imagen === '../statics/icons/spidermiles.jpg') {
            return imagen11;
        }  else if (imagen === '../statics/icons/tracer.jpg') {
            return imagen12;
        } else {
            return imagen13;
        }
    }
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
                    <div class="card-body">
                        <img class="picture" src={ mostrarImagenPerfil() } alt="Imagen de perfil"/>
                        <tr>
                        <td> <h5>Username: </h5> </td>
                        <td> <h3>{usuario}</h3> </td>
                        </tr>

                        <br></br>

                        <tr>
                        <td> <h5>Nombre: </h5> </td>
                        <td> <h3>{nombre}</h3> </td>
                        </tr>

                        {!amigo == true && (
                            <button className="btn btn-outline-secondary">
                            Mandar solicitud de amistad
                          </button>
                        )}

                        <br></br>
                    </div>
                    
                </div>               
            )}
      </body>
    </div>
  );
}

export default BuscarUsuario;