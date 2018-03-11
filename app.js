var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    //an array of 3 objects
   var campgrounds = [
       {name: "salmon creek", image:"https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"},
       {name: "G hill", image:"https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg"},
       {name: "salt lake", image:"http://res.muenchen-p.de/.imaging/stk/responsive/image980/dms/lhm/tourismus/camping-l/document/camping-l.jpg"}
       ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpcamp server has started!");
});