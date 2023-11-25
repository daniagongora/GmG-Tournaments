import React from 'react';
import { useLocation } from 'react-router-dom';

import '../statics/css/General.css';
import '../statics/css/Perfil.css';

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

function MostrarImagenPerfil(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();

    function mostrarImagenPerfil() {
        if (location.state.ImagenPerfil === '../statics/icons/icon.png') {
            return imagen13;
        } else if (location.state.ImagenPerfil === '../statics/icons/crash.png') {
            return imagen1;
        }  else if (location.state.ImagenPerfil === '../statics/icons/dave.jpg') {
            return imagen2;
        }  else if (location.state.ImagenPerfil === '../statics/icons/doge.jpg') {
            return imagen3;
        }  else if (location.state.ImagenPerfil === '../statics/icons/ender.jpg') {
            return imagen4;
        }  else if (location.state.ImagenPerfil === '../statics/icons/fallguy.jpg') {
            return imagen5;
        }  else if (location.state.ImagenPerfil === '../statics/icons/freddy.png') {
            return imagen6;
        }  else if (location.state.ImagenPerfil === '../statics/icons/kirby.jpg') {
            return imagen7;
        }  else if (location.state.ImagenPerfil === '../statics/icons/papitas.png') {
            return imagen8;
        }  else if (location.state.ImagenPerfil === '../statics/icons/pingu.jpg') {
            return imagen9;
        }  else if (location.state.ImagenPerfil === '../statics/icons/spidergwen.png') {
            return imagen10;
        }  else if (location.state.ImagenPerfil === '../statics/icons/spidermiles.jpg') {
            return imagen11;
        }  else if (location.state.ImagenPerfil === '../statics/icons/tracer.jpg') {
            return imagen12;
        } else {
            return imagen13;
        }
    }

    return (
        <img class="picture" src={ mostrarImagenPerfil() } alt="Imagen de perfil"/>
    );
}

export default MostrarImagenPerfil;