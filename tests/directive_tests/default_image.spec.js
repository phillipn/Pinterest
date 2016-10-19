describe('default image directive', function() {
  beforeEach(angular.mock.module('pictureApp'));

  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
  }));

  describe('broken image', function(){
    beforeEach(inject(function($compile, $rootScope){
      element = angular.element('<img id="actualImage" ng-model="brokenLink" src="http://localhost:8080" default-image/>');
      spyOn(element, 'on').and.returnValue('error');
      scope = $rootScope.$new();
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should have "no picture" link as image if error', function (done) {
      setTimeout(function(){
        expect(element.attr('src')).toEqual("http://www.novelupdates.com/img/noimagefound.jpg");
        done();
      }, 1000);
    });
  });

  describe('valid image', function(){
    var scope, element;
    beforeEach(inject(function($compile, $rootScope){
      element = angular.element('<img id="actualImage" ng-model="brokenLink" src="http://localhost:8080" default-image/>');
      scope = $rootScope.$new();
      scope.brokenLink = false;
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should have supplied picture link as image if no error', function () {
        expect(element.attr('src')).toEqual("http://localhost:8080");
    });
  });
});
