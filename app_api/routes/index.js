var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlPics = require('../controllers/pictures');

router.get('/user', ctrlAuth.getUser);
router.delete('/user', ctrlAuth.logout);

router.get('/pictures', ctrlPics.getAllPics);
router.post('/pictures', ctrlPics.postPic);
router.get('/pictures/:userName', ctrlPics.getUserPics);
router.put('/pictures/:pictureId', ctrlPics.updateLikes);
router.delete('/pictures/:pictureId', ctrlPics.deletePic);

module.exports = router;
