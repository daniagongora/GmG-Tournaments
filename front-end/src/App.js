import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Bienvenida from './components/Bienvenida';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/bienvenida" exact component={Bienvenida} />
        <Route path="/error" exact component={Error} />
      </Switch>
    </Router>
  );
}

export default App;