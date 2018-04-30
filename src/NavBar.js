import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavBar extends Component {

	constructor(props) {
    super(props);
    this.state = {user: "username in NavBar", value:""}
		this.handleChange=this.handleChange.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
  }

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSearch(e){
			this.props.handleKeyword(this.state.value)
	}

	render(){
	  return (
		<div>
			<Navbar inverse collapseOnSelect>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#brand">HOME</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav>
			      <NavItem eventKey={1} href="#">
							<Link to={{pathname: '/mainpage'	}} className='links'>
									Mainpage
							</Link>
			      </NavItem>
			      <NavItem eventKey={2} href="#">
			        Link
			      </NavItem>
			      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
			        <MenuItem eventKey={3.1}>Action</MenuItem>
			        <MenuItem eventKey={3.2}>Another action</MenuItem>
			        <MenuItem eventKey={3.3}>Something else here</MenuItem>
			        <MenuItem divider />
			        <MenuItem eventKey={3.3}>Separated link</MenuItem>
			      </NavDropdown>
			    </Nav>

			    <Nav pullRight>
			      <NavItem eventKey={1} href="#">
						<Link to={{pathname: '/accountpage',}} className='links'>
			        Account
						</Link>
			      </NavItem>
			    </Nav>

			  </Navbar.Collapse>
			</Navbar>

			<Navbar>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">Bbay</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Navbar.Form pullLeft>
			      <FormGroup>
			        <FormControl onChange={this.handleChange} value={this.state.value} type="text" placeholder="Search" />
			      </FormGroup>{' '}
			      <Button onClick={this.handleSearch} type="submit">
							<Link to={{pathname: '/searchresult'	}} className='searchLink'>
									Search
							</Link>
						</Button>
			    </Navbar.Form>
			  </Navbar.Collapse>
			</Navbar>

    </div>
	  )
	}
}

export default NavBar
