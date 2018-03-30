var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud",
            image: "https://i5.walmartimages.com/asr/1612bbda-c9d6-41a2-bff2-ffbb3a86bc70_1.5d8d1e4cebef199a08e2c936d29f5beb.jpeg",
            description: "blah blah blah"
        },
        {
            name: "Desert",
            image: "https://is2-ssl.mzstatic.com/image/thumb/Music69/v4/08/98/f4/0898f4f0-6245-ff65-d16e-e667750b38c7/dj.wvzuzitd.jpg/1200x630bb.jpg",
            description: "blah blah blah2"
        },
        {
            name: "Desert2",
            image: "https://shadyrecords.com//wp-content/uploads/2013/01/63916201-500x500.jpg",
            description: "blah blah blah3"
        }
    ];

function seedDB(){
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("removed all!");
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