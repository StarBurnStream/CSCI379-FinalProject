import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Checkbox, Well } from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class SearchResult extends Component {

	render(){
	  return (
		<div>
		<Route exact path='/' render = {() => (
				<NavBar />
		)}/>

			<div>
			  <Well bsSize="large">
					<FormGroup>
						<Checkbox inline>1</Checkbox>
						<Checkbox inline>2</Checkbox>{' '}
						<Checkbox inline>3</Checkbox>
					</FormGroup>
				</Well>
			</div>;


		</div>

	  )
	}
}

export default SearchResult
