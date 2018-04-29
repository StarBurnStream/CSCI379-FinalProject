import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LogIn.css";
import "./index.css"
import sha256 from 'sha256';
//const config = require('./config.json');
const config = require('./configTest.json');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", userid: "", email: "", phonenumber: "", r:null, password: ""}
    this.handleClickSignup = this.handleClickSignup.bind(this);
    this.handleClickSignin = this.handleClickSignin.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length>0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  handleClickSignup(event){
    var url = config.url + "userlookup/" + document.getElementById("username").value
    fetch(url)
      .then(result=>result.json())
      .then(result=>{
        if (result.result === "success"){
          console.log("Username already exist")
        }
        else{
          var ranNum =  Math.floor(Math.random()*2**32)
          this.setState({
            username: document.getElementById("username").value,
            passwordhash: sha256(document.getElementById("password").value + ranNum),
            r:ranNum
          }, () => {
            var url = config.url + "signup/" + this.state.username + "/" + this.state.passwordhash + "/" + this.state.r
            fetch(url,{method: "PUT"})
              .then(result=>result.json())
              .then(result=>{
				result.user.cilentHash = this.state.passwordhash
				this.setState({user:result.user}, ()=> {
					this.props.handleLogIn(this.state.user)
					})
              })
          });
        }
      })
  }

  handleClickSignin(event){
    var url = config.url + "userlookup/" + document.getElementById("username").value
    fetch(url)
      .then(result=>result.json())
      .then(result=>{
        console.log(result)
        if (result.result === "success"){
            var clientHash = sha256(document.getElementById("password").value + result.r)
            var url = config.url + "signin/" + document.getElementById("username").value + "/" + clientHash
            fetch(url)
              .then(result=>result.json())
              .then(result=>{
                if (result.result === 'success'){
                  console.log('Login Successfully!')
				  url = config.url + "user/" + document.getElementById("username").value
                  fetch(url)
					.then(result=>result.json())
					.then(result=>{
						result.user.cilentHash = clientHash
						this.setState({user:result.user}, ()=> {
							this.props.handleLogIn(this.state.user)
						})
					})
                }
                else{
                  console.log('Wrong password!')
                }
              })
        }
        else{
          console.log("user not found")
        }
      })
  }

  render() {
    return (
      <div className="Login">
        <div class="enjoy-css">Bbay</div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>User Name</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleClickSignin}
          >
            Login
          </Button>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleClickSignup}
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}
