import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Checkbox, Well } from 'react-bootstrap';
import {Col, Row, Thumbnail, Grid, Modal} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory"

class SearchResult extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			smShow: false,
			lgShow: false,
			keyword:this.props.keyword,
			firsttime: true
		};
		this.handleClose = this.handleClose.bind(this)
	}

	handleClose = event => {
		this.setState({lgShow: false});
	}

	render(){
		const history = createHistory()
		const location = history.location
		var x = location.pathname.split(":")[1]
		console.log(x)
	  return (
		<div>
			<Grid>
				<Row>
					<Col xs={6} md={4}>
						<Thumbnail src="unicorn.jpg" alt="242x200">
							<h3>Item Name</h3>
							<p>Price</p>
							<p>
							<Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>Detail</Button>

							<Modal show={this.state.lgShow} {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
								<Modal.Header closeButton>
									<Modal.Title id="contained-modal-title-lg"><h1>Item Title</h1></Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<h2>Item Price</h2>
									<h3>
										Seller
										<br/>
										Contact Info
										<br/>
										Trade Method
										<br/>
									</h3>
									<h4>Item Description</h4>
									<p>
										alkfjdslkfaldkjfla
										<br/>
										fjosjadfofjdoapfjodjfo
									</p>
								</Modal.Body>
								<Modal.Footer>
									<Button onClick={this.handleClose}>Close</Button>
								</Modal.Footer>
							</Modal>

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
