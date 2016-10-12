var mongoose = require('mongoose');

var pictureSchema = mongoose.Schema({
  image_url: String,
  title: String,
  userName: String,
  likes: [String]
});

mongoose.model('Picture', pictureSchema);
