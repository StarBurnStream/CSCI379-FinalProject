import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import {Tab, Col, Row, Panel, ControlLabel, HelpBlock} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class Mainpage extends Component {
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


	render(){
	  return (
		<div>
			<Route exact path='/' render = {() => (
					<NavBar />
			)}/>
      <div>
        <div>
          <img width={100} height={100} display='block' src="unicorn.jpg" />
        </div>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix">
              <Col sm={2}>
                <Nav bsStyle="pills" stacked>
                  <NavItem eventKey="Account Info">Account Info</NavItem>
                  <NavItem eventKey="Account Management">Account Management</NavItem>
                  <NavItem eventKey="Buy History">Buy History</NavItem>
                  <NavItem eventKey="Sell History">Sell History</NavItem>
                  <NavItem eventKey="Pending Order">Pending Order</NavItem>
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
                    <Panel bsStyle="primary">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Screen Name</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup>
                        <FormControl type="text" placeholder="New Screen Name" />
                      </FormGroup>{' '}
                      <Button>Save</Button>
                    </Panel.Body>
                    </Panel>
                    <Panel bsStyle="success">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Real Name</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup>
          			        <FormControl type="text" placeholder="New Real Name" />
          			      </FormGroup>{' '}
                      <Button>Save</Button>
                    </Panel.Body>
                    </Panel>
                    <Panel bsStyle="info">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Gender</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup>
                        <FormControl type="text" placeholder="New Gender" />
                      </FormGroup>{' '}
                      <Button>Save</Button>
                    </Panel.Body>
                    </Panel>
                    <Panel bsStyle="warning">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Photo</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup>
                        <FormControl type="text" placeholder="Search" />
                      </FormGroup>{' '}
                      <Button>Save</Button>
                    </Panel.Body>
                    </Panel>
                    <Panel bsStyle="danger">
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Password</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      <FormGroup>
                        <FormControl placeholder="Search" id="formControlsPassword" label="New Password" type="password"/>
                      </FormGroup>{' '}
                      <FormGroup>
                        <FormControl placeholder="Search" id="formControlsPassword" label="Confirm New Password" type="password"/>
                      </FormGroup>{' '}
                      <Button>Save</Button>
                    </Panel.Body>
                    </Panel>
                  </Tab.Pane>

                  <Tab.Pane eventKey="Buy History">Tab 2 conten</Tab.Pane>
                  <Tab.Pane eventKey="Sell History">Tab 2 content</Tab.Pane>
                  <Tab.Pane eventKey="Pending History">Tab 2 content</Tab.Pane>
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

export default Mainpage
