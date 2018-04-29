import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class Mainpage extends Component {

	constructor(props) {
		super(props);
		this.state = {user: this.props.user}
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


	render(){
		console.log(this.state.user)
	  return (
		<div>

			<Carousel>
			  <Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="unicorn.jpg" />
			    <Carousel.Caption>
			      <h3>First slide label</h3>
			      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			    </Carousel.Caption>
			  </Carousel.Item>

				<Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="unicorn.jpg" />
			    <Carousel.Caption>
			      <h3>First slide label</h3>
			      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			    </Carousel.Caption>
			  </Carousel.Item>

				<Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="unicorn.jpg" />
			    <Carousel.Caption>
			      <h3>First slide label</h3>
			      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>;

    </div>
	  )
	}
}

export default Mainpage
