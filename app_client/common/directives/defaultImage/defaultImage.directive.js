(function () {

  angular
    .module('pictureApp')
    .directive('defaultImage', defaultImage);

  function defaultImage () {
    if(angular.element(this).attr('ng-model')){
      return {
        restrict:'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
          element.on('error', function() {
            element.attr('src', "http://www.novelupdates.com/img/noimagefound.jpg");
            ngModel.$setViewValue(true);
          })
          ngModel.$setViewValue(false);
        }
      }
    } else {
      return {
        restrict:'A',
        link: function(scope, element, attr, ngModel) {
          element.on('error', function() {
            element.attr('src', "http://www.novelupdates.com/img/noimagefound.jpg");
            return;
          })
        }
      }
    }
  }

})();
