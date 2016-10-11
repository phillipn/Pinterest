var mongoose = require('mongoose');

// define the schema for our user model
var pictureSchema = mongoose.Schema({
  image_url: String,
  title: String,
  userName: String,
  likes: [String]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Picture', pictureSchema);
