import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import {Tab, Col, Row, Panel, ControlLabel, HelpBlock, InputGroup, Radio} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class AccountPage extends Component {

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
                      <Button>Update</Button>
                    </Panel.Body>
                    </Panel>

                    <Panel bsStyle="info">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Gender</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
											<FormGroup controlId="gender">
												<p>Gender</p>
												<FormControl componentClass="select" placeholder="Gender">
													<option defaultSelected value="Prefered not to say">Prefered not to say</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</FormControl>
											</FormGroup>
                      <Button>Update</Button>
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
                      <Button>Update</Button>
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
                      <Button>Update</Button>
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
                      <Button>Update</Button>
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
