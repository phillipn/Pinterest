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
  Picture.find({userName: userName}).exec(function(err, pics){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    if(!pics){
      sendJSONresponse(res, 404, "No pics");
    }
    sendJSONresponse(res, 200, pics);
  })
}

module.exports.postPic = function(req, res){
  var picData = req.body;

  Picture.create({
    title: picData.title,
    image_url: picData.image_url,
    likes: [],
    userName: req.user.twitter.displayName
  }, function(err, pic){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    sendJSONresponse(res, 201, pic);
  });
}

module.exports.updateLikes = function(req, res){
  var pictureId = req.params.pictureId;
  var likeObj = req.body;
  Picture.findById(pictureId).exec(function(err, pic){
    if(err){
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    if(!pic){
      sendJSONresponse(res, 404, "Picture not found, sorry!");
      return;
    }
    if(likeObj.like === true){
      pic.likes.push(req.user.twitter.displayName);
    } else {
      var index = (pic.likes).indexOf(req.user.twitter.displayName);
      if (index >= 0) {
        (pic.likes).splice( index, 1 );
      }
    }
    pic.save(function(err, pic){
      if(err){
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, pic);
    })
  })
}

module.exports.deletePic = function(req, res){
  var pictureId = req.params.pictureId;
  if(pictureId){
    Picture.findByIdAndRemove(pictureId).exec(function(err, pic) {
      if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 204, null);
    });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No locationid"
    });
  }
}
