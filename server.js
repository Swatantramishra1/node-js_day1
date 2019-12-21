// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");

var Bear = require("./app/models/bear");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

router.route("/bears").post(function(req, res) {
  var bear = new Bear(); // create a new instance of the Bear model
  bear.name = req.body.name; // set the bears name (comes from the request)
  console.log(req.body.name);

  new Bear({
    name: req.body.name
  }).save(function(err, doc) {
    if (err) res.json(err);
    else res.send("Successfully inserted!");
  });

  // save the bear and check for errors
  // bear.save(function(err) {
  //   if (err) res.send(err);

  //   res.json({ message: "Bear created!" });
  // });
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// Data

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dbName");
const mongo = require("mongodb");
// const url = "mongodb://localhost:27017";
// mongoose.Promise = global.Promise;
console.log("trying database to connect!");

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
