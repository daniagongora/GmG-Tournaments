import React from 'react';
import ReactRouterDom, { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Bienvenida from './components/Bienvenida';
import Error from './components/Error';
import Principal from './components/Principal';
import MiPerfil from './components/MiPerfil';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component ={Principal}/>
        <Route path="/login" exact component={Login} />
        <Route path="/bienvenida" exact component={Bienvenida} />
        <Route path="/error" exact component={Error} />
        <Route path="/MiPerfil" exact component={MiPerfil}/>
        <Route path="/logout" exact component={Logout}/>
      </Switch>
    </Router>
  );
}

export default App;