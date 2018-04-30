const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())

// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
//const config = JSON.parse(fs.readFileSync('config.json', 'UTF-8'))
//const config = JSON.parse(fs.readFileSync('/Destiny/Abroad/Study/Sixth Semester/CSCI 379 Web/csci379-finalproject/server/configTest.json', 'UTF-8'))
const config = JSON.parse(fs.readFileSync('/Users/HaleBopp/Desktop/Fullstack/CSCI379-FinalProject/server/configTest.json', 'UTF-8'))

mongoose.connect(config.dburl)
var db = mongoose.connection
var ObjectId = mongoose.Schema.Types.ObjectId
// define the User schema
var userSchema = mongoose.Schema({
  username: String,
  name: String,
  gender: String,
  photo: String,
  email: String,
  sold: [ObjectId],
  selling: [ObjectId],
  phone: String,
  watchlist: [ObjectId]
})
// bind schema to the mongodb collection 'User'
var User = mongoose.model('User', userSchema)

// define the UserSecret schema
var userSecretSchema = mongoose.Schema({
  username: String,
  passwordhash: String,
  authorization: String,
  r:Number
})
// bind schema to the mongodb collection 'User'
var UserSecret = mongoose.model('UserSecret', userSecretSchema)


// define the Item schema
var itemSchema = mongoose.Schema({
  title: String,
  price: String,
  photo: String,
  condition: String, // new or old
  situation: String, // pending or sold
  sellername: String,
  buyinfo: [{buyername: String, state:String}],
  description: String,
  trademethod: String
})


// bind schema to the mongodb collection 'Item'
var Item = mongoose.model('Item', itemSchema)

// set to remove all docs in database, if there is anything leftover
var cleanDb = false

if (cleanDb === true){
  User.remove({}, err=>{
    if(err) console.log("failed to remove all docs from User")
  })
  Item.remove({}, err=>{
    if(err) console.log("failed to remove all docs from Item")
  })
}
// a place to store all of the orders
// don't need this any more!
//var orders = {}
//var orderId = 0

// .use binds to all http methods
// no route, means apply to ALL routes
// so all req's will be passed through
// the bodyParser.json() function
app.use(bodyParser.json())

// The API always uses the route :orderName,
// we can move checking for the order into an application-level
// middleware
function userParser(req, res, next){

  // this no longer works, we have to query the database (use Order.find()!)
  // if (req.params.orderName in orders){

  User.find({username: req.params.username}, (err, users)=>{
    if (err || users.length === 0) {
      res.json({result:'User not found.'})
    }else{
      req.user = users[0]
      next()
    }
  })
}

function userSecretParser(req, res, next){

  // this no longer works, we have to query the database (use Order.find()!)
  // if (req.params.orderName in orders){

  UserSecret.find({username: req.params.username}, (err, userSecret)=>{
    if (err || userSecret.length === 0) {
      res.json({result:'User not found.'})
    }else{
      req.userSecret = userSecret[0]
      next()
    }
  })
}

function itemParser(req, res, next){

  // this no longer works, we have to query the database (use Order.find()!)
  // if (req.params.orderName in orders){

  Item.find({itemid: req.params.itemid}, (err, items)=>{
    if (err || items.length === 0) {
      res.json({result:'Item not found.'})
    }else{
      req.item = items[0]
      next()
    }
  })
}


// bind middleware to the application
// for GET, DELETE, and POST
app.get('/user/:username', userParser)
app.get('/userlookup/:username', userSecretParser)
app.get('/signin/:username/:clientHash', userParser)
app.delete('/user/:username', userParser)
app.post('/updaterealname/:username/:clientHash', userParser)
app.post('/updateemail/:username/:clientHash', userParser)
app.post('/updategender/:username/:clientHash', userParser)
app.post('/updatephone/:username/:clientHash', userParser)
app.post('/updatepassword/:username/:clientHash', userSecretParser)

app.get('/item/:itemid', itemParser)
app.delete('/item/:itemid', itemParser)
app.post('/item/:itemid', itemParser)

// show all users
app.get('/user', (req, res) => {
  User.find().then(users => {
      res.json(users)
    })
})

// get a user with username
app.get('/user/:username', (req, res) => {
  res.json({
      result:'success',
      user: req.user
    })
})

// get a user's random r
app.get('/userlookup/:username', (req, res) => {

  res.json({
      result:'success',
      r:req.userSecret.r
    })
})

// sign in
app.get('/signin/:username/:clientHash', (req, res) => {
	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash

		if (req.params.clientHash === pwdhash){
		  res.json({
			  result:'success',
			  user: req.user
			})
		}
		else{
			res.json({
				result:'Wrong Password!'
			})
		}
	})
})

// sign up
app.put('/signup/:username/:passwordhash/:r', (req, res) => {
  console.log("Create a user: ", req.params.username)

  var user = User({
      username:req.params.username
      })
  user.save()

  var userSecret = UserSecret({
      username:req.params.username,
	  passwordhash:req.params.passwordhash,
	  r:req.params.r
      })
  userSecret.save()

  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    user: user
  })
})

app.delete('/user/:userid', (req, res) => {
  console.log("Delete order for", req.user)

  User.remove({_id:req.user._id}, err=>{
    if (err) {
      res.json({result:"error", message:err})
    }else{
      res.json({result:"success"})
    }
  })
})

// Update user information or change password
app.post('/updaterealname/:username/:clientHash', (req, res) => {
  	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash
		if (req.params.clientHash === pwdhash){
			console.log("Access permitted")
			req.user.name = req.body.realname
			req.user.save()
			res.json({
				result:'success',
				user: req.user
			})
		}
		else{
			console.log("Access denied")
			res.json({
				result:"Not correctly logged in. Access denied."
			})
		}
	})
})

app.post('/updateemail/:username/:clientHash', (req, res) => {
  	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash
		if (req.params.clientHash === pwdhash){
			console.log("Access permitted")
			req.user.email = req.body.email
			req.user.save()
			res.json({
				result:'success',
				user: req.user
			})
		}
		else{
			console.log("Access denied")
			res.json({
				result:"Not correctly logged in. Access denied."
			})
		}
	})
})

app.post('/updatephone/:username/:clientHash', (req, res) => {
  	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash
		if (req.params.clientHash === pwdhash){
			console.log("Access permitted")
			req.user.phone = req.body.phone
			req.user.save()
			res.json({
				result:'success',
				user: req.user
			})
		}
		else{
			console.log("Access denied")
			res.json({
				result:"Not correctly logged in. Access denied."
			})
		}
	})
})

app.post('/updategender/:username/:clientHash', (req, res) => {
  	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash
		if (req.params.clientHash === pwdhash){
			console.log("Access permitted")
			req.user.gender = req.body.gender
			req.user.save()
			res.json({
				result:'success',
				user: req.user
			})
		}
		else{
			console.log("Access denied")
			res.json({
				result:"Not correctly logged in. Access denied."
			})
		}
	})
})

app.post('/updatepassword/:username/:clientHash', (req, res) => {
	if (req.params.clientHash === req.userSecret.passwordhash){
		console.log("Access permitted")
		req.userSecret.passwordhash = req.body.passwordhash
		req.userSecret.save()
		res.json({
			result:'success'
		})
	}
	else{
		console.log("Access denied")
		res.json({
			result:"Wrong Password."
		})
	}

})

app.post('/updatepassword/:username/:clientHash', userSecretParser)

// show all items
app.get('/item', (req, res) => {
  Item.find().then(items => {
      res.json(items)
    })
})

// get an item with id
app.get('/item/:itemid', (req, res) => {
  res.json({
      result:'success',
      item: req.item
    })
})

app.put('/item/:username/:clientHash', (req, res) => {

  	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		if (err | userSecret.length === 0){
			res.json({result:"User not found."})
		}
		else{
			var pwdhash = userSecret[0].passwordhash
			if (req.params.clientHash === pwdhash){
				console.log("Access permitted")
				console.log("Create an item: ", req.body.title)
				var item = Item({
					title: req.body.title,
					price: req.body.price,
					condition: req.body.condition,
					description: req.body.description,
					trademethod: req.body.trademethod,
					sellername: req.params.username,
					situation: "selling"
					})
				item.save()

				User.find({username: req.params.username}, (err, users)=>{
					var user = users[0]
					user.selling.push(item._id)
					user.save()

					res.json({
					result: 'success',
					user: user
					})
				})


			}
			else{
				console.log("Access denied")
				res.json({
					result:"Not correctly logged in. Access denied."
				})
			}
		}
	})

})

app.delete('/item/:itemid', (req, res) => {
  console.log("Delete order for", req.item)

  User.remove({_id:req.item._id}, err=>{
    if (err) {
      res.json({result:"error", message:err})
    }else{
      res.json({result:"success"})
    }
  })
})


app.listen(3001, () => console.log('My server listening on port 3001!'))
