import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import history from './history';
import Movimientos from './screens/Movimientos';
import Orden from './screens/Orden';
import Ventas from './screens/Ventas';
import 'antd/dist/antd.css';

class App extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact render={props => (<Movimientos history={props.history} />)} />
        <Route path="/movimientos" exact render={props => (<Movimientos history={props.history} />)} />
        <Route path="/orden" exact render={props => (<Orden history={props.history} />)} />
        <Route path="/ventas" exact render={props => (<Ventas history={props.history} />)} />
      </Router>
    );
  }
}

export default App;
