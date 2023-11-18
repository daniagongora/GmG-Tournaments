import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Error from "./components/Error";
import Principal from "./components/Principal";
import Logout from "./components/Logout";
import Perfil from "./components/Perfil";
import EditarPerfil from "./components/EditarPerfil";
import VerAmigos from "./components/VerAmigos";
import CrearTorneo from "./components/CrearTorneo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Principal} />
        <Route path="/login" exact component={Login} />
        <Route path="/error" exact component={Error} />
        <Route
          path="/perfil:idUsuario/:nombreUsuario"
          exact
          component={Perfil}
        />
        <Route path="/logout" exact component={Logout} />
        <Route
          path="/editarPerfil:idUsuario/:nombreUsuario"
          exact
          component={EditarPerfil}
        />
        <Route
          path="/perfil:idUsuario/:nombreUsuario/verAmigos"
          exact
          component={VerAmigos}
        />
        <Route
          path="/:nombreUsuario/creartorneo"
          exact
          component={CrearTorneo}
        />
      </Switch>
    </Router>
  );
}

export default App;
