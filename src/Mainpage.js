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
	  return (
	  <div>
		<div id= "mainpagemid">

			<Carousel>
			  <Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="unicorn.jpg" />
			    <Carousel.Caption>
			      <h3>Gundam</h3>
			      <p>Unicorn</p>
			    </Carousel.Caption>
			  </Carousel.Item>

				<Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="keyboard.jpg" />
			    <Carousel.Caption>
			      <h3>Keyboard</h3>
			      <p>Keyboard in dana</p>
			    </Carousel.Caption>
			  </Carousel.Item>

				<Carousel.Item>
			    <img width={900} height={500} alt="900x500" src="handwriting.jpg" />
			    <Carousel.Caption>
			      <h3>Handwriting</h3>
			      <p>From Japan</p>
			    </Carousel.Caption>
			  </Carousel.Item>
			</Carousel>;
			</div>
    </div>
	  )
	}
}

export default Mainpage
