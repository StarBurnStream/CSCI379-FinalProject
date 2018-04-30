import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Popover, ButtonToolbar, Overlay } from "react-bootstrap";
import "./LogIn.css";
import "./index.css"
import sha256 from 'sha256';
const config = require('./config.json');
//const config = require('./configTest.json');

export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {username: "", userid: "", email: "", phonenumber: "", r:null, password: "", show:false, signupshow: false, signinshow:false}
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
          this.setState({target: document.getElementById("signupButton"), signupshow: true, signinshow: false});
        }
        else{
          this.setState({target: document.getElementById("signupButton"), signupshow: false, signinshow: false});
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
					this.props.handleUpdateState(this.state.user)
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
          this.setState({target: document.getElementById("signinButton"), signupshow: false, signinshow:false});
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
						var newUser = result.user
						newUser.clientHash = clientHash
						this.setState({user:newUser}, ()=> {
							this.props.handleUpdateState(this.state.user)
						})
					})
                }
                else{
                  console.log('Wrong password!')
                  this.setState({target: document.getElementById("signinButton"), signupshow:false, signinshow: true});
                }
              })
        }
        else{
          console.log("user not found")
          this.setState({target: document.getElementById("signinButton"), signupshow: false, signinshow: true});
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

          <ButtonToolbar>
            <Button id="signupButton" block bsSize="large" disabled={!this.validateForm()} type="submit" onClick={this.handleClickSignup}>
              Sign Up
            </Button>
            <Overlay
              show={this.state.signupshow}
              target={this.state.target}
              placement="right"
              container={this}
              containerPadding={20}
            >
              <Popover>
                <strong>User already exists!</strong>
              </Popover>
            </Overlay>
          </ButtonToolbar>

          <ButtonToolbar>
            <Button id="signinButton" block bsSize="large" disabled={!this.validateForm()} type="submit" onClick={this.handleClickSignin}>
              Login
            </Button>
            <Overlay
              show={this.state.signinshow}
              target={this.state.target}
              placement="right"
              container={this}
              containerPadding={20}
            >
              <Popover>
                <strong>Wrong username or password!</strong>
              </Popover>
            </Overlay>
          </ButtonToolbar>

        </form>
      </div>
    );
  }
}
