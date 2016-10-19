describe('authentication service', function() {
  var Users, $httpBackend;

  beforeEach(angular.mock.module('pictureApp'));

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  beforeEach(inject(function(_authentication_, _$httpBackend_) {
    authentication = _authentication_;
    $httpBackend = _$httpBackend_;
  }));

  describe('authentication service', function(){
    it('should exist', function() {
      expect(authentication).toBeDefined();
    });
  });

  describe('authentication methods', function(){
    describe('.getUser', function(){
      it('should be defined', function(){
        expect(authentication.getCurrentUser).toBeDefined;
        $httpBackend.expect('GET', '/api/user').respond(200);
        authentication.getCurrentUser();
        expect($httpBackend.flush).not.toThrow();
      });
    });
    describe('.logout', function(){
      it('should be defined', function(){
        expect(authentication.logout).toBeDefined;
        $httpBackend.expect('DELETE', '/api/user').respond(200);
        authentication.logout();
        expect($httpBackend.flush).not.toThrow();
      })
    });
  });
});
