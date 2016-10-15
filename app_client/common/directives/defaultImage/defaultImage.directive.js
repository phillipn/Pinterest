(function () {

  angular
    .module('pictureApp')
    .directive('defaultImage', defaultImage);

  function defaultImage () {
    return {
      restrict:'A',
      require: 'ngModel',
      link: function(scope, element, attr, ngModel) {
        element.on('error', function() {
          element.attr('src', attr.defaultImage);
          ngModel.$setViewValue(true);
          return;
        })
        ngModel.$setViewValue(false);
      }
    }
  }

})();
