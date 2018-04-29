import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Checkbox, Well } from 'react-bootstrap';
import {Col, Row, Thumbnail, Grid, Modal} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class SearchResult extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			smShow: false,
			lgShow: false
		};
	}

	render(){
		let lgClose = () => this.setState({ lgShow: false });

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
						<MyLargeModal show={this.state.lgShow} onHide={lgClose} />
						</p>
					</Thumbnail>
				</Col>

				<Col xs={6} md={4}>
					<Thumbnail src="unicorn.jpg" alt="242x200">
						<h3>Item Name</h3>
						<p>Price</p>
						<p>
						<Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>Detail</Button>
						<MyLargeModal show={this.state.lgShow} onHide={lgClose} />
						</p>
					</Thumbnail>
				</Col>

				<Col xs={6} md={4}>
					<Thumbnail src="unicorn.jpg" alt="242x200">
						<h3>Item Name</h3>
						<p>Price</p>
						<p>
						<Button bsStyle="primary" onClick={() => this.setState({ lgShow: true })}>Detail</Button>
						<MyLargeModal show={this.state.lgShow} onHide={lgClose} />
						</p>
					</Thumbnail>
				</Col>



			</Row>
		</Grid>


		</div>

	  )
	}
}

class MyLargeModal extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default SearchResult
