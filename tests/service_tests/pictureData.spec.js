describe('pictureData service', function() {
  var Users, result, $httpBackend;

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

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function(_pictureData_, _$q_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    pictureData = _pictureData_;
  }));

  it('should exist', function() {
    expect(pictureData).toBeDefined();
  });

  describe('pictureData methods', function(){
    describe('.getAllPics', function(){
      it('should be defined and call correct api', function(){
        expect(pictureData.getAllPics).toBeDefined();
        $httpBackend.expect('GET', '/api/pictures').respond(200);
        pictureData.getAllPics();
        expect($httpBackend.flush).not.toThrow();
      });
    });
    describe('.getUserPics', function(){
      it('should be defined and call correct api', function(){
        expect(pictureData.getUserPics).toBeDefined();
        $httpBackend.expect('GET', '/api/pictures/' +'user').respond(200);
        pictureData.getUserPics('user');
        expect($httpBackend.flush).not.toThrow();
      })
    });
    describe('.postPic', function(){
      it('should be defined and call correct api', function(){
        expect(pictureData.postPic).toBeDefined();
        $httpBackend.expect('POST', '/api/pictures/').respond(201);
        pictureData.postPic({title: 'me', image_url: 'someURL'});
        expect($httpBackend.flush).not.toThrow();
      })
    });
    describe('.toggleLikes', function(){
      it('should be defined and call correct api', function(){
        expect(pictureData.toggleLikes).toBeDefined();
        $httpBackend.expect('PUT', '/api/pictures/' +'pictureID').respond(200);
        pictureData.toggleLikes('pictureID');
        expect($httpBackend.flush).not.toThrow();
      })
    });
    describe('.deletePicture', function(){
      it('should be defined and call correct api', function(){
        expect(pictureData.deletePicture).toBeDefined();
        $httpBackend.expect('DELETE', '/api/pictures/' +'pictureID').respond(200);
        pictureData.deletePicture('pictureID');
        expect($httpBackend.flush).not.toThrow();
      })
    });
  })
});
