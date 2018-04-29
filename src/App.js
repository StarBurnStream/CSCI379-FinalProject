import React, { Component } from 'react';
import './App.css';
import Mainpage from './Mainpage';
import LogIn from './LogIn';
import SearchResult from './SearchResult';
import ItemPage from './ItemPage';
import AccountPage from './AccountPage';
import NavBar from './NavBar';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <Route exact path='/' render = {() => (
            <LogIn />
        )}/>

        <Route exact path='/mainpage' render = {() => (
            <Mainpage />
        )}/>

        <Route exact path='/searchresult' render = {() => (
            <SearchResult />
        )}/>

        <Route exact path='/itempage' render = {() => (
            <ItemPage />
        )}/>

        <Route exact path='/accountpage' render = {() => (
            <AccountPage />
        )}/>
      </div>


    );
  }
}

export default App;
