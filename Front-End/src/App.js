import React from 'react';
import ReactRouterDom, { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Error from './components/Error';
import Principal from './components/Principal';
import Logout from './components/Logout';
import Perfil from './components/Perfil';
import EditarPerfil from './components/EditarPerfil';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component ={Principal}/>
        <Route path="/login" exact component={Login} />
        <Route path="/error" exact component={Error} />
        <Route path="/perfil/:nombreUsuario" exact component={Perfil}/>
        <Route path="/logout" exact component={Logout}/> 
        <Route path="/editarperfil/:nombreUsuario" component={EditarPerfil} />
      </Switch>
    </Router>
  );
}

export default App;