import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LogIn.css";
import "./index.css"
import sha256 from 'sha256';
const config = require('./config.json');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", pwd:"", userid: "", email: "", phonenumber: "", r:""}
    this.handleClickSignup = this.handleClickSignup.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
    this.handleClickSignin = this.handleClickSignin.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClickSignup(event){
		var url = config.url + "userlookup/" + document.getElementById("username").value
		fetch(url)
			.then(result=>result.json())
			.then(result=>{
				console.log(result)
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
								console.log(result)
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
		this.setState({
			username: document.getElementById("username").value})
	}

	handleClickUpdate(event){
		this.setState({
			email: document.getElementById("email").value,
			phone: document.getElementById("phonenumber").value
			}, () => {
			var url = config.url + "update/" + this.state.username
			var data = { email: this.state.email,
						 phone: this.state.phone}
			fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: new Headers({'Content-Type': 'application/json'
			})})
				.then(result=>result.json())
				.then(result=>{
					console.log(result)
				})
			});
		}


  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <div class="enjoy-css">Bbay</div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
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
          >
            Login
          </Button>

          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}
