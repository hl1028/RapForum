var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));//for POST body

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/YelpCamp"); //create or use db called YelpCamp
//localhost is your mongodb address, need to run by mongod

//SCHEMA SETUP
var Camp = require("./models/campground");//mongoose model
var seedDB = require("./seeds");
//use for one time
//seedDB();
var Comment = require("./models/comment");


app.set("view engine", "ejs");

/** We use RESTful - CRUD: create read update destroy*/


// Camp.create(
//     {
//         name: "Hill",
//         image: "https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg",
//         description: "This is the HHH Hill that you can play PS4. No water."
//     }, function(err, newcamp){
//       if(err){
//           console.log(err);
//       } else {
//           console.log(newcamp);
//       }
// });
//   var campgrounds = [
//       {name: "salmon creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
//       {name: "salt lake", image:"http://res.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg"}
//       ];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    //using mongoDB
    Camp.find({}, function(err, allcamp){   //pass allCamps from mongodb to /campgrounds Page
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds", {campgrounds: allcamp});
       }
    });
    //using global var
    //res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){        //in REST it should be same
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Camp.create(newCampground, function(err, newOne){
        if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
    //campgrounds.push(newCampground);
    //redirect back to campgrounds page
});

app.get("/campgrounds/new", function(req, res){        //show new
    res.render("new");
});

//SHOW - shows info of one campground
app.get("/campgrounds/:id", function(req, res){//show new
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    //with populate, foundCamp should have linked comments now    
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCamp});
        }
    });

});

//********COMMENTS ROUTES*************/
app.get("/campgrounds/:id/comments/new", function(req, res){//show new
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){//show new
    //find the camp by ID
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, currcomment){
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(currcomment);
                  campground.save();
                  res.redirect('/campgrounds/' + campground._id);
                }
                
            });
        }
    })
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp server has started!");
});