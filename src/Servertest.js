import React, { Component } from 'react';
import './App.css';
import sha256 from 'sha256';
const config = require('./config.json');
//const config = require('./configTest.json');

class Servertest extends Component {

	constructor(props){
		super(props)
		this.state = {username: "", password:"", email: "", phonenumber: "", r:null}
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
	
	handleClickUpdateRealName(event){
		var realName = document.getElementById("realnname").value
		var url = config.url + "updaterealname/" + this.state.user.username + "/" + this.state.user.clientHash
		var data = { realname : realName}
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'
		})})
		.then(result=>result.json())
		.then(result=>{
			if (result.result === 'success'){
				result.user.clientHash = this.state.user.clientHash
				this.setState({user:result.user}, ()=> {
					this.props.handleUpdateState(this.state.user)
				})
			}
			else{
				console.log(result.result)
			}
		})
	}

	handleClickUpdateEmail(event){
		var email = document.getElementById("email").value
		var url = config.url + "updateemail/" + this.state.user.username + "/" + this.state.user.clientHash
		var data = { email : email}
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'
		})})
		.then(result=>result.json())
		.then(result=>{
			if (result.result === 'success'){
				result.user.clientHash = this.state.user.clientHash
				this.setState({user:result.user}, ()=> {
					this.props.handleUpdateState(this.state.user)
				})
			}
			else{
				console.log(result.result)
			}
		})
	}
	
	handleClickUpdatePhone(event){
		var phone = document.getElementById("phone").value
		var url = config.url + "updatephone/" + this.state.user.username + "/" + this.state.user.clientHash
		var data = { phone : phone}
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'
		})})
		.then(result=>result.json())
		.then(result=>{
			if (result.result === 'success'){
				result.user.clientHash = this.state.user.clientHash
				this.setState({user:result.user}, ()=> {
					this.props.handleUpdateState(this.state.user)
				})
			}
			else{
				console.log(result.result)
			}
		})
	}

	handleClickUpdateGender(event){
		var gender = document.getElementById("gender").value // need modification
		var url = config.url + "updategender/" + this.state.user.username + "/" + this.state.user.clientHash
		var data = { gender : gender}
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: new Headers({'Content-Type': 'application/json'
		})})
		.then(result=>result.json())
		.then(result=>{
			if (result.result === 'success'){
				result.user.clientHash = this.state.user.clientHash
				this.setState({user:result.user}, ()=> {
					this.props.handleUpdateState(this.state.user)
				})
			}
			else{
				console.log(result.result)
			}
		})
	}
	
	handleClickUpdatePassword(event){
		var newPassword1 = document.getElementById("newpassword1").value
		var newPassword2 = document.getElementById("newpassword2").value
		if (newPassword1 === newPassword2){
			var currentPassword = document.getElementById("currentpassword").value
			var clientHash = sha256(currentPassword)
			var passwordHash = sha256(newPassword1)
			var url = config.url + "updatepassword/" + this.state.user.username + "/" + clientHash
			var data = { passwordhash : passwordHash}
			fetch(url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: new Headers({'Content-Type': 'application/json'
			})})
			.then(result=>result.json())
			.then(result=>{
				if (result.result === 'success'){
					var newUser = this.state.user
					newUser.clientHash = passwordHash
					this.setState({user:newUser}, ()=> {
						this.props.handleUpdateState(this.state.user)
					})
				}
				else{
					console.log(result.result)
				}
			})
		}
		else{
			console.log("new password not match")
		}
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
