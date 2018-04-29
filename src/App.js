import React, { Component } from 'react';
import './App.css';
import Mainpage from './Mainpage';
import LogIn from './LogIn';
import SearchResult from './SearchResult';
import ItemPage from './ItemPage';
import AccountPage from './AccountPage';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render = {() => (
            <AccountPage />
        )}/>
      </div>
    );
  }
}

export default App;
