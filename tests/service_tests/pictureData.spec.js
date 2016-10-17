describe('pictureData service', function() {
  var Users, result;

  var API = "http://localhost:8080/api/pictures";

  var RESPONSE_SUCCESS = [
    {
      "title": "ne",
      "image_url": "https://s-media-cache-ak0.pinimg.com/564x/b5/4f/96/b54f963d95ba238f4c261141a4153b7e.jpg",
      "userName": "Nicholas Phillips",
      "likes": [
          "Nicholas Phillips"
      ]
    },
    {
      "title": "d",
      "image_url": "http://www.novelupdates.com/img/noimagefound.jpg",
      "userName": "Nicholas Phillips",
      "likes": []
    },
    {
      "title": "reme",
      "image_url": "http://www.novelupdates.com/img/noimagefound.jpg",
      "userName": "Nicholas Phillips",
      "likes": []
    }
  ];

  beforeEach(angular.mock.module('pictureApp'));

  beforeEach(inject(function(_pictureData_, _$q_, _$httpBackend_) {
    pictureData = _pictureData_;
  }));

  it('should exist', function() {
    expect(pictureData).toBeDefined();
  });

  describe('pictureData methods', function(){
    describe('.getAllPics', function(){
      it('should be defined', function(){
        expect(pictureData.getAllPics).toBeDefined();
      });
    });
    describe('.getUserPics', function(){
      it('should be defined', function(){
        expect(pictureData.getUserPics).toBeDefined();
      })
    });
    describe('.postPic', function(){
      it('should be defined', function(){
        expect(pictureData.postPic).toBeDefined();
      })
    });
    describe('.toggleLikes', function(){
      it('should be defined', function(){
        expect(pictureData.toggleLikes).toBeDefined();
      })
    });
    describe('.deletePicture', function(){
      it('should be defined', function(){
        expect(pictureData.deletePicture).toBeDefined();
      })
    });
  })
});
