var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1/yelpcamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://vq5m02e0f663b3ski25j8sfq-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/KimCarroll.com_KimCarroll.com_EVERGREEN_0014.jpg",
// 		description: "This is a huge Granite Hill, no bathrooms. No water" 
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND: ");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
});

//where you create a campground
app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW - show the form where you can add a campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render the show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(port, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started");
});








