import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './Vapor.css';

function Logout(){
    const history = useHistory();
    history.replace('/', null)
    
    return (
        <div>
        <Redirect to='/' />
        </div>
    );
}

export default Logout;