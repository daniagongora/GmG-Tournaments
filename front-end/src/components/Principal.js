import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './Vapor.css';

function Principal(){
    return (
        <body>
            <div>   
            <h1>GmG <br></br>Tournaments</h1>
            <Link to='/login' type="button" class="btn btn-outline-secondary" >Iniciar Sesion</Link>
            <br></br>
            <Link to='/' type="button" class="btn btn-outline-secondary" >Registrar</Link>
            </div>
        </body>
      );
}

export default Principal;