var express = require("express");
var router = express.Router();
var Camp = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");   //auto index.js

//********COMMENTS ROUTES*************/
//check login before comment
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){//show new
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
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
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
                  req.flash("success", "Added Freestyle")
                  res.redirect('/campgrounds/' + campground._id);
                }
                
            });
        }
    })
});

//EDIT comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if (err){
            res.redirect("back");
        } else {
            req.flash("success", "Freestyle Edited"); 
            res.redirect("/campgrounds/" + req.params.id);
        }
     });
});

//DESTROY comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   //find and remove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Freestyle Deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   })
});





module.exports = router;