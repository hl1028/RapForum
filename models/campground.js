var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"     //model name
      }
   ]
});

module.exports = mongoose.model("Camp", campSchema);//create or use Collection called Camp/"camps"