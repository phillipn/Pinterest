describe('homeController', function() {
  var $controller, $q, pictureData, authentication, scope, def, pictureService, homeController;

  var API = "http://localhost:8080/api/pictures";

  var PICTURE_I_LIKE = {
    _id: '36086jhgfd8',
    title: 'me',
    image_url: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
    likes: ["you", "him", "her", "Nicholas Phillips"],
    userName: "someone"
  };

  var PICTURE_I_DONT_LIKE = {
    _id: '36086jhgfd8',
    title: 'me',
    image_url: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
    likes: ["you", "him", "her"],
    userName: "someone"
  };

  var RETURNED_PICTURE_I_DONT_LIKE = {
    data: {
      _id: '36086jhgfd8',
      title: 'me',
      image_url: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
      likes: ["you", "him", "her"],
      userName: "someone"
    }
  };

  var RETURNED_PICTURE_I_LIKE = {
    data: {
      _id: '36086jhgfd8',
      title: 'me',
      image_url: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
      likes: ["you", "him", "her", "Nicholas Phillips"],
      userName: "someone"
    }
  };


  var PICTURE_LIST = {
    data:
      [{
        "title": "ne",
        "image_url": "https://s-media-cache-ak0.pinimg.com/564x/b5/4f/96/b54f963d95ba238f4c261141a4153b7e.jpg",
        "userName": "SOME DUDE",
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
        "userName": "SOME GIRL",
        "likes": []
      }]
  };

  var USER_PICTURE_LIST = {
    data:
      [{
        "title": "d",
        "image_url": "http://www.novelupdates.com/img/noimagefound.jpg",
        "userName": "Nicholas Phillips",
        "likes": []
      }]
  };

  var USER = {
    data: {
      _id:"57cbe2a09faf7bc37111f2f",
      twitter: {
        displayName:"Nicholas Phillips",
        id:"782756478053803520",
        token:"78275698076803520-VVDM6ugwem26Z4q7bQUTPZCdAf6a68h",
        username: "G_Philips"
      }
    }
  };

  var NO_USER = {
    data: {}
  };

  beforeEach(angular.mock.module('pictureApp'));
  beforeEach(angular.mock.module('ui.router'));

  beforeEach(function(){
    pictureService = {
      getAllPics: function(){
        def = $q.defer();
        return def.promise;
      },
      getUserPics: function(){
        def = $q.defer();
        return def.promise;
      },
      postPic: function(){
        def = $q.defer();
        return def.promise;
      },
      toggleLikes: function(){
        def = $q.defer();
        return def.promise;
      },
      deletePicture: function(){
        def = $q.defer();
        return def.promise;
      }
    }
    authenticationService = {
      getCurrentUser: function(){
        def = $q.defer();
        return def.promise;
      },
      logout: function(){
        def = $q.defer();
        return def.promise;
      }
    }
  });

  beforeEach(inject(function(_$controller_, _$rootScope_, _$q_) {
    scope = _$rootScope_.$new();
    $q = _$q_;
    $controller = _$controller_;
    spyOn(authenticationService, "getCurrentUser").and.callThrough();
    spyOn(authenticationService, "logout").and.callThrough();
    spyOn(pictureService, "getAllPics").and.callThrough();
    spyOn(pictureService, "getUserPics").and.callThrough();
    spyOn(pictureService, "postPic").and.callThrough();
    spyOn(pictureService, "toggleLikes").and.callThrough();
    spyOn(pictureService, "deletePicture").and.callThrough();
    homeController = $controller('homeController', { $scope: scope, pictureData: pictureService, authentication: authenticationService });
    homeController.user = USER.data;
  }));

  describe('homeControllerInit', function() {
    it('should call pictureService.getAllPics on init', function(){
      expect(pictureService.getAllPics).toHaveBeenCalled();
    })

    it('should assign data to homeController.pictures', function() {
      homeController.getAllPics();
      def.resolve(PICTURE_LIST);
      scope.$digest();
      expect(homeController.pictures).toBe(PICTURE_LIST.data);
    });

    it('should call authentication.getCurrentUser on init', function(){
      expect(authenticationService.getCurrentUser).toHaveBeenCalled();
    });

    it('should assign data to homeController.user', function() {
      def.resolve(USER);
      scope.$digest();
      expect(homeController.user).toBe(USER.data);
    });
  });

  describe('homeController.emphasize', function(){
    it('homeController.emphasize should emphsize All Pics tab when clicked', function(){
      homeController.emphasize('allPicsLink');
      expect(homeController.allPicsLinkEmph).toBe(true);
      expect(homeController.userPicsLinkEmph).toBe(false);
    });
    it('homeController.emphasize should emphsize User Pics tab when clicked', function(){
      homeController.emphasize('userPicsLink');
      expect(homeController.allPicsLinkEmph).toBe(false);
      expect(homeController.userPicsLinkEmph).toBe(true);
    });
  });

  describe('homeController.removeAlerts', function(){
    it('homeController.removeAlerts should remove alerts pertaining to form submission', function(){
      homeController.removeAlerts();
      expect(homeController.imageError).toBe(false);
      expect(homeController.imageSent).toBe(false);
    });
  });

  describe('homeController.getUserPics', function(){
    it('should call pictureService.getUserPics(User)', function(){
      homeController.getUserPics({});
      expect(pictureService.getUserPics).toHaveBeenCalled();
    });
    it('should assign users pictures to homeController.user', function(){
      homeController.getUserPics({});
      def.resolve(PICTURE_LIST);
      scope.$digest();
      expect(homeController.userPictures).toBe(PICTURE_LIST.data);
    });
  })

  describe('homeController.postPic', function(){
    it('should call pictureService.postPic()', function(){
      var valid_image = {
        image_url: 'http://localhost:8080',
        title: 'me'
      };
      homeController.postPic(valid_image);
      expect(pictureService.postPic).toHaveBeenCalled();
    });
    it('should refuse submitted image without title or url', function(){
      var bad_image = {};
      homeController.postPic(bad_image);
      expect(homeController.imageSent).toBe(false);
      expect(homeController.imageError).toBe("Please enter a title and image url");
    })
    it('should revise image_url if submitted url is broken', function(){
      var valid_image = {
        image_url: 'http://localhost:8080',
        title: 'me'
      }
      homeController.brokenLink = true;
      homeController.postPic(valid_image);
      expect(valid_image.image_url).toBe("http://www.novelupdates.com/img/noimagefound.jpg");
    })
    it('should submit picture and add it to vm', function(){
      var CREATED_IMAGE = {
        data: {
          title: 'me',
          image_url: 'http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg',
          likes: [],
          userName: "Nicholas"
        }
      };
      homeController.postPic({title: 'me', image_url: 'http://www.novelupdates.com/img/noimagefound.jpg'});
      def.resolve(CREATED_IMAGE);
      scope.$digest();
      expect(homeController.pictures).toContain(CREATED_IMAGE.data);
      expect(homeController.userPictures).toContain(CREATED_IMAGE.data);
      expect(homeController.formData).toEqual({});
      expect(homeController.imageError).toBe(false);
      expect(homeController.imageSent).toBe("Image submitted");
    });
  });

  describe('vm.userLikes', function(){
    it('should say I DO NOT like', function(){
      homeController.user = USER.data;
      expect(homeController.userLikes(PICTURE_I_DONT_LIKE)).toBe(false);
    });
    it('should say I DO like', function(){
      homeController.user = USER.data;
      expect(homeController.userLikes(PICTURE_I_LIKE)).toBe(true);
    });
  });

  describe('vm.toggleLikes', function(){
    it('should call pictureService.toggleLike() with picture I do not like', function(){
      homeController.toggleLikes(PICTURE_I_LIKE, 6);
      expect(PICTURE_I_LIKE.likes.length).toBe(3);
      expect(pictureService.toggleLikes).toHaveBeenCalledWith(PICTURE_I_LIKE._id, {like: false});
    });
    it('should call pictureService.toggleLike() with picture I do like', function(){
      homeController.toggleLikes(PICTURE_I_DONT_LIKE, 6);
      expect(PICTURE_I_DONT_LIKE.likes.length).toBe(4);
      expect(pictureService.toggleLikes).toHaveBeenCalledWith(PICTURE_I_DONT_LIKE._id, {like: true});
    });
    it('should re-assign picture after like update', function(){
      homeController.toggleLikes(PICTURE_I_LIKE, 0);
      def.resolve(RETURNED_PICTURE_I_DONT_LIKE);
      scope.$digest();
      expect(homeController.pictures[0]).toEqual(RETURNED_PICTURE_I_DONT_LIKE.data);
    });
    it('should re-assign picture after NOT like update', function(){
      homeController.toggleLikes(PICTURE_I_DONT_LIKE, 0);
      def.resolve(RETURNED_PICTURE_I_LIKE);
      scope.$digest();
      expect(homeController.pictures[0]).toEqual(RETURNED_PICTURE_I_LIKE.data);
    });
  });

  describe('vm.deletePicture(pictureId, index)', function(){
    it('should call pictureService.deletePicture', function(){
      homeController.deletePicture(PICTURE_I_LIKE._id, 0);
      expect(pictureService.deletePicture).toHaveBeenCalledWith(PICTURE_I_LIKE._id);
    });
    it('should delete', function(){
      homeController.deletePicture(PICTURE_I_LIKE._id, 0);
      expect(homeController.pictures[0]).toBe(undefined);
    });
  });

  describe('vm.logout', function(){
    it('should call authenticationService.logout()', function(){
      homeController.logout();
      expect(authenticationService.logout).toHaveBeenCalled();
    });
    it('should reassign user variable and call homeController.getAllPics()', function(){
      homeController.logout();
      def.resolve(NO_USER);
      scope.$digest();
      expect(homeController.user).toBe(NO_USER.data);
    })
  })
});;
