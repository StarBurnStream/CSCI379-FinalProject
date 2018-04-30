import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl, Carousel, Checkbox, Well } from 'react-bootstrap';
import {Col, Row, Thumbnail, Grid, Modal, Jumbotron} from 'react-bootstrap';
import NavBar from "./NavBar";
import { Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory"

//const config = require('./config.json');
const config = require('./configTest.json');
var keyword = ""
class SearchResult extends Component {
	
	constructor(props, context) {
		super(props, context);

		this.state = {
			smShow: false,
			lgShow: false,
			keyword:"",
			user: this.props.user
		};
		this.handleClose = this.handleClose.bind(this)
		//this.handleResult = this.handleResult.bind(this)
	}
/*
	handleResult = event => {
		var url = config.url + "itemsearch/" + keyword
		fetch(url)
			.then(result => result.json())
			.then(result => {
				console.log(result)
				if (result.length === 0) {
					var html = "<p>No item found!</p>"
					document.getElementById("insertbox").innerHTML = html
				}
				else{
					document.getElementById("insertbox").innerHTML = ""
					var items = result
					var newHTML = ""
					for ( var j=0;j<items.length;j++){
						var item = items[j]
						newHTML += "<Col xs={6} md={4}>"
					+  "<div class='card' style='width:400px'>"
					+	"< img class='card-img-top' src='unicorn.jpg' alt='Card image' style='width:10%'>"
					+	"<div class='card-body'>"
					+	  "<h4 class='card-title'>John Doe</h4>"
					+	  "<p class='card-text'>Some example text some example text. John Doe is an architect and engineer</p >"
					+	  "< a href=' ' class='btn btn-primary'>See Profile</ a>"
					+	"</div>"
					+  "</div>"
					+"</Col>"
						
					}
					document.getElementById("insertbox").innerHTML = newHTML
				}
			})
	}
	*/
	handleClose = event => {
		this.setState({lgShow: false});
	}

	componentDidUpdate(){
		console.log("update")
		var url = config.url + "itemsearch/" + keyword
		fetch(url)
			.then(result => result.json())
			.then(result => {
				console.log(result)
				if (result.length === 0) {
					var html = "<p>No item found!</p>"
					document.getElementById("insertbox").innerHTML = html
				}
				else{
					document.getElementById("insertbox").innerHTML = ""
					var items = result
					var newHTML = ""
					for ( var j=0;j<items.length;j++){
						var item = items[j]
						newHTML += "<Col xs={6} md={4}>"
					+  "<div class='card' style='width:400px'>"
					+	"<div class='card-body'>"
					+	  "<h2 class='card-title'>" + item.title + "</h2>"
					+	  "<h4 class='card-title'>Price: $" + item.price + "<br/>Seller: " + item.sellername + "<br/>Email: " + this.state.user.email + "<br/>Phone: " + this.state.user.phone 
					+ "<br/>Trade Method: " + item.trademethod + "</h4>"
					+	  "<p class='card-text'>Description: " + item.description + "</p >"
					+	"</div>"
					+  "</div>"
					+"</Col>"
						
					}
					document.getElementById("insertbox").innerHTML = newHTML
				}
			})
	}

	
	
	componentWillUpdate(){
		console.log("will update")
		const history = createHistory()
		const location = history.location
		keyword = location.pathname.split(":")[1]
	
	}
	
	render(){
		
		console.log("render")
		//if (document.getElementById("insertbox").innerHTML !== null){
		//console.log(document.getElementById("insertbox").innerHTML)}
	  return (
		<div>
			<Grid>
				<Row id = "insertbox">
					Welcome to Search Page.
				</Row>
			</Grid>
		</div>

	  )
	}
}

export default SearchResult
