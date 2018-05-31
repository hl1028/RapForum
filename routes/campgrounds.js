var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");
var middleware = require("../middleware");   //auto index.js

router.get("/campgrounds", function(req, res){
    console.log(req.user);
    //using mongoDB
    Camp.find({}, function(err, allcamp){   //pass allCamps from mongodb to /campgrounds Page
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/campgrounds", {campgrounds: allcamp});
       }
    });
    //using global var
    //res.render("campgrounds", {campgrounds: campgrounds});
});

//NEW
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){        //in REST it should be same
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {      //ADD USER info
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    
    Camp.create(newCampground, function(err, newOne){
        if(err){
           console.log(err);
       } else {
           console.log(newOne);
           res.redirect("/campgrounds");
       }
    });
    //campgrounds.push(newCampground);
    //redirect back to campgrounds page
});

//show CREATE camp form
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){        
    res.render("campgrounds/new");
});

//SHOW - shows info of one campground
router.get("/campgrounds/:id", function(req, res){//show new
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    //with populate, foundCamp should have linked comments now    
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCamp});    //pass object into ejs, foundCamp-->campground
        }
    });
});

//EDIT
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Camp.findById(req.params.id, function(err, foundCamp){
            res.render("campgrounds/edit", {campground: foundCamp});
        });
});

//UPDATE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Camp.findByIdAndUpdate(req.params.id, req.body.editcamp, function(err, foundCamp){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   Camp.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   })
});

//middleware




module.exports = router;