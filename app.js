var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose");

app.set("view engine", "ejs");

   var campgrounds = [
       {name: "salmon creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "salt lake", image:"http://res.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg"}
       ];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    //an array of 3 objects
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){        //in REST it should be same
    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){        //show new
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp server has started!");
});