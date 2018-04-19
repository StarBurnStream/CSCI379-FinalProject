import React, { Component } from 'react';
import './App.css';
import Mainpage from './Mainpage';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render = {() => (
            <Mainpage />
        )}/>
      </div>
    );
  }
}

export default App;
