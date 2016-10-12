(function(){
  angular
    .module('pictureApp', ['ui.router', 'ngAnimate'])

  function config($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: '/home/home.view.html',
        controller: 'homeController as vm'
      })
    $urlRouterProvider.otherwise('/');
  }

  angular.module('pictureApp').config(['$stateProvider', '$urlRouterProvider', config])

})();
