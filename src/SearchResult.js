import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Checkbox, Well } from 'react-bootstrap';
import {Col, Row, Thumbnail, Grid} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class SearchResult extends Component {

	render(){
	  return (
		<div>

		<Grid>
			<Row>
				<Col xs={6} md={4}>
					<Thumbnail src="unicorn.jpg" alt="242x200">
						<h3>Item Name</h3>
						<p>Price</p>
						<p>
						<Button bsStyle="primary">Detail</Button>
						<Button bsStyle="default">Watch Later</Button>
						</p>
					</Thumbnail>
				</Col>

				<Col xs={6} md={4}>
					<Thumbnail src="unicorn.jpg" alt="242x200">
						<h3>Item Name</h3>
						<p>Price</p>
						<p>
						<Button bsStyle="primary">Detail</Button>
						<Button bsStyle="default">Watch Later</Button>
						</p>
					</Thumbnail>
				</Col>

				<Col xs={6} md={4}>
					<Thumbnail src="unicorn.jpg" alt="242x200">
						<h3>Item Name</h3>
						<p>Price</p>
						<p>
						<Button bsStyle="primary">Detail</Button>
						<Button bsStyle="default">Watch Later</Button>
						</p>
					</Thumbnail>
				</Col>



			</Row>
		</Grid>


		</div>

	  )
	}
}

export default SearchResult
