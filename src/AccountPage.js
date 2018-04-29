import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import {Tab, Col, Row, Panel, ControlLabel, HelpBlock, InputGroup, Radio} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';
import sha256 from 'sha256';
//const config = require('./config.json');
const config = require('./configTest.json');

class AccountPage extends Component {
	constructor(props) {
		super(props);
		this.state = {user: this.props.user}
		this.handleClickUpdateRealName = this.handleClickUpdateRealName.bind(this);
		this.handleClickUpdateEmail = this.handleClickUpdateEmail.bind(this);
		this.handleClickUpdateGender = this.handleClickUpdateGender.bind(this);
		this.handleClickUpdatePhone = this.handleClickUpdatePhone.bind(this);
		this.handleClickUpdatePassword = this.handleClickUpdatePassword.bind(this);
	}
	function(){
	  document.getElementById('.carousel-showmanymoveone .item').each(function(){
	    var itemToClone = document.getElementById(this);

	    for (var i=1;i<6;i++) {
	      itemToClone = itemToClone.next();

	      // wrap around if at end of item collection
	      if (!itemToClone.length) {
	        itemToClone = document.getElementById(this).siblings(':first');
	      }

	      // grab item, clone, add marker class, add to collection
	      itemToClone.children(':first-child').clone()
	        .addClass("cloneditem-"+(i))
	        .appendTo(document.getElementById(this));
	    }
	  });
	};

	handleUpload = event => {
		console.log(document.getElementById("ItemName").value);
		console.log(document.getElementById("ItemPrice").value);
		console.log(document.getElementById("ItemQuality").value);
		console.log(document.getElementById("ItemDescription").value);
		console.log(document.getElementById("ItemMethod").value);
	}

	handleClickUpdateRealName(event){
		var realName = document.getElementById("realnname").value
		console.log(this.state)
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

        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix">
              <Col sm={2}>
                <Nav bsStyle="pills" stacked>
									<NavItem><img width={100} height={100} display='block' src="unicorn.jpg" /></NavItem>
                  <NavItem eventKey="Account Info">Account Info</NavItem>
                  <NavItem eventKey="Account Management">Account Management</NavItem>
                  <NavItem eventKey="Buy History">Buy History</NavItem>
                  <NavItem eventKey="Sell History">Sell History</NavItem>
                  <NavItem eventKey="Pending Order">Pending Order</NavItem>
									<NavItem eventKey="Post Item">Post Item</NavItem>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content animation>
                  <Tab.Pane eventKey="Account Info">
                    <Panel bsStyle="primary">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Screen Name</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="success">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Real Name</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="info">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Gender</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="warning">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Photo</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                    <Panel bsStyle="danger">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Email</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>Panel content</Panel.Body>
                    </Panel>
                  </Tab.Pane>

                  <Tab.Pane eventKey="Account Management">

                    <Panel bsStyle="success">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Real Name</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup controlId="realnname">
          			        <FormControl type="text" placeholder="Real Name" />
          			      </FormGroup>{' '}
                      <Button onClick={this.handleClickUpdateRealName}>Update</Button>
                    </Panel.Body>
                    </Panel>

                    <Panel bsStyle="info">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Gender</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
											<FormGroup controlId="gender">
												<p>Gender</p>
												<FormControl componentClass="select" placeholder="Quality">
													<option defaultSelected value="Prefer not to say">Prefer not to say</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</FormControl>{' '}
												<br></br>
	                      <Button onClick={this.handleClickUpdateGender}>Update</Button>
											</FormGroup>
                    </Panel.Body>
                    </Panel>

                    <Panel bsStyle="warning">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Email</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup  controlId="email">
                        <FormControl type="text" placeholder="Email" />
                      </FormGroup>{' '}
                      <Button onClick={this.handleClickUpdateEmail}>Update</Button>
                    </Panel.Body>
                    </Panel>

					<Panel bsStyle="danger">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Phone Number</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup  controlId="phone">
                        <FormControl type="text" placeholder="Phone Number" />
                      </FormGroup>{' '}
                      <Button onClick={this.handleClickUpdatePhone}>Update</Button>
                    </Panel.Body>
                    </Panel>

                    <Panel bsStyle="primary">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Password</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
					  <FormGroup controlId="currentpassword">
						<FormControl placeholder="Original Password" type="password"/>
					  </FormGroup>{' '}
                      <FormGroup controlId="newpassword1">
                        <FormControl placeholder="New Password" type="password"/>
                      </FormGroup>{' '}
                      <FormGroup controlId="newpassword2">
                        <FormControl placeholder="Confirm New Password" type="password"/>
                      </FormGroup>{' '}
                      <Button onClick={this.handleClickUpdatePassword}>Update</Button>
                    </Panel.Body>
                    </Panel>
                  </Tab.Pane>

                  <Tab.Pane eventKey="Buy History">Tab 2 content</Tab.Pane>
                  <Tab.Pane eventKey="Sell History">Tab 2 content</Tab.Pane>
                  <Tab.Pane eventKey="Pending Order">Tab content</Tab.Pane>

                  <Tab.Pane eventKey="Post Item">

					<Panel bsStyle="info">
					<Panel.Heading>
						<Panel.Title componentClass="h3">Item Information</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<FormGroup controlId="ItemName">
							<p>Name of Item</p>
							<FormControl type="text" placeholder="Name" />
						</FormGroup>{' '}

						<FormGroup controlId="ItemPrice">
							<p>Item Price</p>
							<InputGroup>
							<InputGroup.Addon>$</InputGroup.Addon>
							<FormControl type="integer" placeholder="Price" />
							</InputGroup>
						</FormGroup>{' '}

						<FormGroup controlId="ItemQuality">
							<p>Quality of Item</p>
							<FormControl componentClass="select" placeholder="Quality">
								<option defaultSelected value="New">New</option>
								<option value="Like New">Like New</option>
								<option value="Very Good">Very Good</option>
								<option value="Good">Good</option>
								<option value="Acceptable">Acceptable</option>
							</FormControl>
						</FormGroup>

						<FormGroup controlId="ItemDescription">
							<p>Item Description</p>
							<FormControl componentClass="textarea" placeholder="Description" />
						</FormGroup>{' '}

						<FormGroup controlId="ItemMethod">
							<p>Trade Method</p>
							<FormControl type="text" placeholder="e.g. Cash or Venmo" />
						</FormGroup>{' '}

						<Button onClick={this.handleUpload}>Upload</Button>
					</Panel.Body>
					</Panel>
				  </Tab.Pane>

                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>


    </div>
	  )
	}
}

export default AccountPage
