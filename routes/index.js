var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root ROUTE
router.get("/", function(req, res){
   res.render("landing"); 
});

//********AUTH ROUTES*************/
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   //passport-local-mongoose package func
   if (req.body.password == req.body.retype_password){
       var newUser = new User({username: req.body.username});
       User.register(newUser, req.body.password, function(err, user){
           if (err){
               req.flash("error", err.message);
               return res.redirect("/register");
           }
           //login during register
           passport.authenticate("local")(req, res, function(){
              req.flash("success", "Welcome! " + req.body.username);
              res.redirect("/campgrounds"); 
           });
       });
   } else {
       req.flash("error", "2 inputs of password are different");
       return res.redirect("/register");
   }
   
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;