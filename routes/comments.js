var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");
var Comment = require("../models/comment");

//********COMMENTS ROUTES*************/
//check login before comment
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){//show new
    //********if shortened routes, req.params.id may not be found*************/
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

//comment create
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //find the camp by ID
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, currcomment){
                if (err) {
                  console.log(err);
                } else {
                  //add username and id to comment
                  currcomment.author.id = req.user._id;     //from logged-in user
                  currcomment.author.username = req.user.username;
                  //save comment
                  currcomment.save();
                  
                  campground.comments.push(currcomment);
                  campground.save();
                  res.redirect('/campgrounds/' + campground._id);
                }
                
            });
        }
    })
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;