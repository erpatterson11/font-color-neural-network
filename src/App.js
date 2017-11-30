import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom'

import Trainer from './components/trainer/Trainer'
import Landing from './components/landing/Landing'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/train" component={Trainer}/>
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}

export default App;
