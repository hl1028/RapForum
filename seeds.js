var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud",
            image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b4134192f4c57ca2ee_340.jpg",
            description: "blah blah blah"
        },
        {
            name: "Desert",
            image: "https://pixabay.com/get/ea36b70928f21c2ad65a5854ee4d459fe270e7c818b4134192f4c57ca2ee_340.jpg",
            description: "blah blah blah2"
        },
        {
            name: "Desert2",
            image: "https://pixabay.com/get/ea36b70928f21c2ad65a5854ee4d459fe270e7c818b4134192f4c57ca2ee_340.jpg",
            description: "blah blah blah3"
        }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("removed one!");
            //if removeAll, then create seeds
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                   if (err) {
                       console.log(err);
                   } else {
                       console.log("added one camp");
                       Comment.create(
                           {
                           text: "This place is good!",
                           author: "Harry"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("created new comment");
                                }
                            });
                   }
                });
            });
        }
    });
    
}

module.exports = seedDB;//no () here!