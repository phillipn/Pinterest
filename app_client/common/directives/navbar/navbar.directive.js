(function(){
  angular
    .module('pictureApp')
    .directive('navbar', navbar);

  function navbar(){
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/navbar/navbar.template.html',
      controller: 'navbarController as navvm'
    };
  }

})();
