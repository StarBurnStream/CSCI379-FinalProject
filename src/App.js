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
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(aUser) {
    this.setState({user: aUser});
  }

  render() {
    return (
      <div>

        <NavBar />

        <Route exact path='/' render = {() => (
            <LogIn handleLogIn={this.handleLogIn}/>
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
            <AccountPage user={this.state.user}/>
        )}/>

		<Route exact path='/servertest' render = {() => (
            <Servertest />
        )}/>
      </div>


    );
  }
}

export default App;
