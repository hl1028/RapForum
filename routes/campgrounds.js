var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");

router.get("/campgrounds", function(req, res){
    console.log(req.user);
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

router.post("/campgrounds", isLoggedIn, function(req, res){        //in REST it should be same
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

//show create camp form
router.get("/campgrounds/new", isLoggedIn, function(req, res){        
    res.render("new");
});

//SHOW - shows info of one campground
router.get("/campgrounds/:id", function(req, res){//show new
    Camp.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
    //with populate, foundCamp should have linked comments now    
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCamp});    //pass object into ejs, foundCamp-->campground
        }
    });

});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;