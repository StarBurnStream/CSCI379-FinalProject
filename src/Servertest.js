import React, { Component } from 'react';
import './App.css';
import sha256 from 'sha256';
//const config = require('./config.json');
const config = require('./configTest.json');

class Servertest extends Component {

	constructor(props){
		super(props)
		this.state = {username: "", pwd:"", userid: "", email: "", phonenumber: "", r:""}
		this.handleClickSignup = this.handleClickSignup.bind(this);
		this.handleClickUpdate = this.handleClickUpdate.bind(this);
		this.handleClickSignin = this.handleClickSignin.bind(this);
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

	render(){
	  return (
	  <div>
		
		<div>
		Username: <input id="username" type="text"></input><br></br><br></br>
		Password: <input id="password" type="text"></input><br></br><br></br>
		<button id="sayItButton" onClick={this.handleClickSignup}>
			Signup
		</button>
		
		<button id="sayItButton" onClick={this.handleClickSignin}>
			Signin
		</button>
		</div>
		
		<br></br>
		<div>
		Email: <input id="email" type="text"></input><br></br><br></br>
		phone number: <input id="phonenumber" type="text"></input><br></br><br></br>
		<button id="sayItButton" onClick={this.handleClickUpdate}>
			Update
		</button>
		</div>
		
	</div>
	  )
	}
}

export default Servertest
