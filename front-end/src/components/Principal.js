import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import './Principal.css'
import './General.css';

function Principal() {
    return (
        <body>
            <div class="title">   
                <h1>GmG <br></br>Tournaments</h1>
            </div>
            <div class="buttons">
                <br></br><br></br>
                <Link to='/login' type="button" class="btn principal btn-outline-secondary">Iniciar Sesion</Link>
                <br></br><br></br>
                <Link to='/' type="button" class="btn principal btn-outline-secondary">Registrarse</Link>
            </div>
        </body>
    );
}

export default Principal;