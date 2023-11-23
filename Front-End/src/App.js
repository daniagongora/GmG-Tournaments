import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CrearTorneo from "./components/CrearTorneo";
import EditarPerfil from './components/EditarPerfil';
import EliminarTorneo from "./components/EliminarTorneo";
import Error from './components/Error';
import Login from './components/Login';
import Logout from './components/Logout';
import Perfil from './components/Perfil';
import Principal from './components/Principal';
import RegistrarPerfil from './components/RegistrarPerfil';
import VerAmigos from './components/VerAmigos';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/perfil:idUsuario/:nombreUsuario/misTorneos/crearTorneo" exact component={CrearTorneo} />
        <Route path="/perfil:idUsuario/:nombreUsuario/editar" exact component={EditarPerfil} />
        <Route path="/perfil:idUsuario/:nombreUsuario/misTorneos" exact component={EliminarTorneo} />
        <Route path="/error" exact component={Error} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout}/> 
        <Route path="/perfil:idUsuario/:nombreUsuario" exact component={Perfil} />
        <Route path="/" exact component ={Principal} />
        <Route path="/registro" exact component={RegistrarPerfil} />
        <Route path="/perfil:idUsuario/:nombreUsuario/amigos" exact component={VerAmigos} />
      </Switch>
    </Router>
  );
}

export default App;