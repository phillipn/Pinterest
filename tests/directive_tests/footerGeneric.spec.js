describe('footerGeneric rendering', function () {

    beforeEach(module('pictureApp'));

    var compile, mockBackend, rootScope;

    beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));

    // Step 1 - Get the $compile service injected into our test
    beforeEach(inject(function ($compile, $httpBackend, $rootScope) {
      compile = $compile;
      mockBackend = $httpBackend;
      rootScope = $rootScope;
    }));


    it('should render HTML based on scope correctly', function () {
      var scope = rootScope.$new();

      mockBackend.expectGET('/common/directives/templates/footerGeneric.template.html').respond('<footer><div class="row"><div class="col-xs-12"><small>&copy; Nick Phillips 2016</small></div></div></footer>');

      //Step 4
      var element = compile('<footer-generic></footer-generic>')(scope);

      //Step 5
      scope.$digest();
      mockBackend.flush();

      //Step 6
      expect(element.html()).toEqual('<footer><div class="row"><div class="col-xs-12"><small>© Nick Phillips 2016</small></div></div></footer>');
      mockBackend.verifyNoOutstandingExpectation();
    });
  });
