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

import createHistory from "history/createBrowserHistory"

const history = createHistory()
const location = history.location

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {user:{username:"null",clienthash:"null"},keyword:"null"}
    this.handleUpdateState = this.handleUpdateState.bind(this);
    this.handleKeyword=this.handleKeyword.bind(this);
  }

  handleUpdateState(aUser) {
    this.setState({user: aUser});
  }

  handleKeyword(newKeyword){
    this.setState({keyword: newKeyword},()=>{console.log(this.state.keyword)});
  }

  render() {
    return (
      <div>

        <NavBar handleKeyword={this.handleKeyword}/>

        <Route exact path='/' render = {() => (
            <LogIn handleUpdateState={this.handleUpdateState}/>
        )}/>

        <Route exact path='/mainpage' render = {() => (
            <Mainpage user={this.state.user}/>
        )}/>

        <Route exact path={'/searchresult:' + this.state.keyword} render = {() => (
            <SearchResult user={this.state.user} keyword={this.state.keyword}/>
        )}/>

        <Route exact path='/accountpage' render = {() => (
            <AccountPage user={this.state.user} handleUpdateState={this.handleUpdateState}/>
        )}/>

		      <Route exact path='/servertest' render = {() => (
            <Servertest user={this.state.user} handleUpdateState={this.handleUpdateState} keyword={this.state.keyword}/>
        )}/>
      </div>


    );
  }
}

export default App;
