var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image: "https://vq5m02e0f663b3ski25j8sfq-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/KimCarroll.com_KimCarroll.com_EVERGREEN_0014.jpg"},
	{name: "Granite Hill", image: "https://vq5m02e0f663b3ski25j8sfq-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/KimCarroll.com_KimCarroll.com_EVERGREEN_0014.jpg"},
	{name: "Mountain Goat's Rest", image: "https://vq5m02e0f663b3ski25j8sfq-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/KimCarroll.com_KimCarroll.com_EVERGREEN_0014.jpg"}
];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){


	res.render("campgrounds", {campgrounds:campgrounds})
});

//where you create a campground
app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
});

//show the form where you can add a campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})

app.listen(port, process.env.IP, function(){
	console.log("The YelpCamp Server Has Started");
});