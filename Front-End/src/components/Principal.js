import React from 'react';
import { Link } from 'react-router-dom'

import '../statics/css/General.css';
import '../statics/css/Principal.css'

function Principal() {
    
    return (

        <div className="card body-content principal">
            <div className="title">   
                <h1>GmG <br></br>Tournaments</h1>
            </div>

            <div className="buttons">
                <br></br><br></br>
                <Link to='/login' type="button" className="btn btn-outline-secondary btn-principal">Iniciar Sesion</Link>
                
                <br></br><br></br>
                <Link to='/registro' type="button" className="btn btn-outline-secondary btn-principal">Registrarse</Link>
            </div>
        </div>
    );
}

export default Principal;