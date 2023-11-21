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
        <Route path="/:nombreUsuario/crearTorneo" exact component={CrearTorneo} />
        <Route path="/editarPerfil:idUsuario/:nombreUsuario" exact component={EditarPerfil} />
        <Route path="/:nombreUsuario/eliminarTorneo" exact component={EliminarTorneo} />
        <Route path="/error" exact component={Error} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout}/> 
        <Route path="/perfil:idUsuario/:nombreUsuario" exact component={Perfil} />
        <Route path="/" exact component ={Principal} />
        <Route path="/registro" exact component={RegistrarPerfil} />
        <Route path="/perfil:idUsuario/:nombreUsuario/verAmigos" exact component={VerAmigos} />
      </Switch>
    </Router>
  );
}

export default App;