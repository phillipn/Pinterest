describe('authentication service', function() {
  var Users, $http;

  beforeEach(angular.mock.module('pictureApp'));

  beforeEach(inject(function(_authentication_) {
    authentication = _authentication_;
  }));

  describe('authentication service', function(){
    it('should exist', function() {
      expect(authentication).toBeDefined();
    });
  });

  describe('authentication methods', function(){
    describe('.getCurrentUser', function(){
      it('should be defined', function(){
        expect(authentication.getCurrentUser).toBeDefined;
      });
    });
    describe('.logout', function(){
      it('should be defined', function(){
        expect(authentication.logout).toBeDefined;
      })
    });
  });
});
