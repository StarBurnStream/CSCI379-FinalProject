import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel } from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';

class ItemPage extends Component {
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

        </div>
      </div>

    </div>
	  )
	}
}

export default ItemPage
