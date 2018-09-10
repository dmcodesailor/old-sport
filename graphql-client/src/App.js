import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StarDataListComponent from './StarDataListComponent';
import { Switch, Route } from 'react-router-dom';
import StarDataComponent from './StarDataComponent';
import Home from './Home';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <Link to="/">Home</Link>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/list" component={StarDataListComponent}></Route>
          <Route path='/star/:id' component={StarDataComponent}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
