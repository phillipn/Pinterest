var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlPics = require('../controllers/pictures');

router.get('/user', ctrlAuth.getUser);
router.delete('/user', ctrlAuth.logout);

router.get('/pictures', ctrlPics.getAllPics);
router.post('/pictures', loggedIn, ctrlPics.postPic);
router.get('/pictures/:userName', loggedIn, ctrlPics.getUserPics);
router.put('/pictures/:pictureId', loggedIn, ctrlPics.updateLikes);
router.delete('/pictures/:pictureId', loggedIn, ctrlPics.deletePic);

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(302, '/#');
  }
}

module.exports = router;
