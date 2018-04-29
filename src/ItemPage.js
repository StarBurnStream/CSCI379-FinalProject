import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Modal } from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class ItemPage extends Component {

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

      <div>
        <div>
          <img width={810} height={450} align='left' float='left' display='block' src="unicorn.jpg" />
        </div>
        <div>
          <h1>Item Title</h1>
          <h2>Item Price</h2>
          <h3>New or Used</h3>
          <p>
            Item Description
          </p>
          <p>
            Contact Info
          </p>
          <p>
          </p>
          <Button>Buy</Button>
					<Button
          bsStyle="primary"
          onClick={() => this.setState({ lgShow: true })}
        >
          Launch large demo modal
        </Button>
					<MyLargeModal show={this.state.lgShow} onHide={lgClose} />

        </div>
      </div>

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

export default ItemPage
