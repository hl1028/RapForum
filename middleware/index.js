var Camp = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        //is user logged in
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp){
            if (err){
                console.log(err);
                req.flash("error", "Camp not found!");
                res.redirect("back");
            } else {
                //does this user own the campground?   ###foundCamp.author.id is an Object
                //if (foundCamp.author.id == req.user._id)
                if (foundCamp.author.id.equals(req.user._id)){
                    next();
                } else {
                    console.log("no permission");
                    req.flash("error", "You don't have permission to do that!"); 
                    res.redirect("back");  
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!"); 
        res.redirect("back");
    }

}

middlewareObj.checkCommentOwnership = function(req, res, next){
        //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log(err);
                req.flash("error", "Comment not found!"); 
                res.redirect("back");
            } else {
                //does this user own the comment?   ###foundComment.author.id is an Object
                //if (foundCamp.author.id == req.user._id)  
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    console.log("no permission");
                    req.flash("error", "You don't have permission to do that!"); 
                    res.redirect("back");  
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!"); 
        res.redirect("back");
    }

}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //add sth to flash
    req.flash("error", "Please Login First!");    //show on next page only 1 time
    res.redirect("/login");
}

module.exports = middlewareObj;