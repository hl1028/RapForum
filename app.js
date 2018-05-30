var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Comment = require("./models/comment"),  //one dot is same level
    User = require("./models/user");

//require routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
app.use(bodyParser.urlencoded({extended: true}));//for POST body

mongoose.connect("mongodb://localhost/YelpCamp"); //create or use db called YelpCamp
//localhost is your mongodb address, need to run by mongod

//SCHEMA SETUP
var Camp = require("./models/campground");//mongoose camps model
var seedDB = require("./seeds");
//use for one time
//seedDB();


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

/** We use RESTful - CRUD: create read update destroy*/

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty is cutest!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to pass currentUser in every Route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp server has started!");
});