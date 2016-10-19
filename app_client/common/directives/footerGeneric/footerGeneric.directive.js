(function () {

  angular
    .module('pictureApp')
    .directive('footerGeneric', footerGeneric);

  function footerGeneric () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/templates/footerGeneric.template.html'
    };
  }

})();
