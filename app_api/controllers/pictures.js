var mongoose = require('mongoose');
var Picture = mongoose.model('Picture');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getAllPics = function(req, res){
  Picture.find({}).exec(function(err, pics){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    sendJSONresponse(res, 200, pics);
  })
}

module.exports.getUserPics = function(req, res){
  var userName = req.params.userName;
  console.log(user);
  Picture.find({userName: userName}).exec(function(err, pics){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    sendJSONresponse(res, 200, pics);
  })
}

module.exports.postPic = function(req, res){

}
