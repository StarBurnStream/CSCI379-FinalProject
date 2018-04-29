import React, { Component } from 'react';
import './App.css';
import Mainpage from './Mainpage';
import LogIn from './LogIn';
import SearchResult from './SearchResult';
import ItemPage from './ItemPage';
import AccountPage from './AccountPage';
import Servertest from './Servertest';
import NavBar from './NavBar';
import { Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {user:{username:"null",clienthash:"null"}}
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }

  handleUpdateState(aUser) {
    this.setState({user: aUser});
  }

  render() {
    return (
      <div>

        <NavBar />

        <Route exact path='/' render = {() => (
            <LogIn handleUpdateState={this.handleUpdateState}/>
        )}/>

        <Route exact path='/mainpage' render = {() => (
            <Mainpage user={this.state.user}/>
        )}/>

        <Route exact path='/searchresult' render = {() => (
            <SearchResult />
        )}/>

        <Route exact path='/itempage' render = {() => (
            <ItemPage />
        )}/>

        <Route exact path='/accountpage' render = {() => (
            <AccountPage user={this.state.user} handleUpdateState={this.handleUpdateState}/>
        )}/>

		<Route exact path='/servertest' render = {() => (
            <Servertest />
        )}/>
      </div>


    );
  }
}

export default App;
