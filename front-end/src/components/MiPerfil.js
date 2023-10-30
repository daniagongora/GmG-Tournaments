import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import './Vapor.css';
import Navegacion from './Navegacion';

function MiPerfil(){
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
        <Navegacion/>
            <h3> {location.state.nombre_usuario} </h3>
        </div>
      );
}

export default MiPerfil;