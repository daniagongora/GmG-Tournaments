import React from 'react';
import {Link} from 'react-router-dom'

import '../statics/css/General.css';
import '../statics/css/Principal.css'

function Principal() {
    return (

        <div>
            <body>  
                <div class="card body-content principal">
                    <div class="title">   
                        <h1>GmG <br></br>Tournaments</h1>
                    </div>
                    <div class="buttons">
                        <br></br><br></br>
                        <Link to='/login' type="button" class="btn btn-outline-secondary btn-principal">Iniciar Sesion</Link>
                        <br></br><br></br>
                        <Link to='/' type="button" class="btn btn-outline-secondary btn-principal">Registrarse</Link>
                    </div>
                </div>
            </body>
        </div>
    
    );
}

export default Principal;