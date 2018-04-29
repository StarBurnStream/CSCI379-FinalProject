const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())

// create db connection
const mongoose = require('mongoose')
const fs = require('fs')
//const config = JSON.parse(fs.readFileSync('config.json', 'UTF-8'))
const config = JSON.parse(fs.readFileSync('/Users/HaleBopp/Desktop/Fullstack/CSCI379-FinalProject/server/configTest.json', 'UTF-8'))
mongoose.connect(config.dburl)
var db = mongoose.connection

// define the User schema
var userSchema = mongoose.Schema({
  username: String,
  name: String,
  gender: String,
  photo: String,
  email: String,
  bought: [String],
  sold: [String],
  pending: [String],
  phone: String,
  watchlist: [String],
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
  itemid: Number,
  price: String,
  condition: String, // new or old
  situation: String, // pending or sold
  sellinfo: {sellerid: Number, date: String},
  buyinfo: [{buyerid: Number, date: String, state:String}]
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
app.post('/update/:username', userParser)

app.get('/item/:itemid', itemParser)
app.delete('/item/:itemid', itemParser)
app.post('/item/:itemid', itemParser)


// show all items
app.get('/item', (req, res) => {
  Item.find().then(items => {
      res.json(items)
    })
})

// show all users
app.get('/user', (req, res) => {
  User.find().then(users => {
      res.json(users)
    })
})

// route parameters are prefixed with a :
app.get('/item/:itemid', (req, res) => {
  res.json({
      result:'success',
      item: req.item
    })
})

app.get('/userlookup/:username', (req, res) => {
	
  res.json({
      result:'success',
      r:req.userSecret.r
    })
})

app.get('/signin/:username/:clientHash', (req, res) => {
	
	UserSecret.find({username: req.params.username}, (err, userSecret)=>{
		var pwdhash = userSecret[0].passwordhash
		   
		if (req.params.clientHash === pwdhash){
		  res.json({
			  result:'success',
			  user: req.user //need to remove passwordhash from this object or create a new document for secret info of users
			})	
		}
		else{
			res.json({
				result:'Wrong Password!'
			})
		}
	})
})

// place an order, deal with toppincs later
// if order already exists, overwrite
// Does not use pizzaParser middleware!
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

app.put('/item/:title', (req, res) => {
  console.log("Create an item: ", req.params.title)

  var item = Item({
      title: req.params.title
      })
  item.save()

  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    item: item
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

// assume post is a JSON array of topping strings.
// like ["pepperoni", "extra cheese" ,"pickles"]
app.post('/update/:username', (req, res) => {

  // push new toppings array to toppings array
  // ... is the ES6 spread operator like *args in python
  // don't forget to save it back to the database!
  req.user.email = req.body.email
  req.user.phone = req.body.phone
  req.user.save()
  res.json({   // echo the order back (which now has an order number)
    result: 'success',
    user: req.user
  })
})

app.listen(3001, () => console.log('My server listening on port 3001!'))

//how do I have two data sheets.
//how do I use post to change values.
//should I use pizzaorder stuff(29) or 33 stuff?
//how to run that on EC2, do port already open for listen? screen, node server.js
//how do I find a user's id using username/email or current user?
//how to generate and keep track of an id I designed
//how to store the id?
