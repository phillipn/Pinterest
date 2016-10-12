var mongoose = require('mongoose');

var pictureSchema = mongoose.Schema({
  image_url: String,
  title: String,
  userName: String,
  likes: [String]
});

module.exports = mongoose.model('Picture', pictureSchema);
