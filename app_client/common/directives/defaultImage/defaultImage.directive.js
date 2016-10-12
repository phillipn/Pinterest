(function () {

  angular
    .module('pictureApp')
    .directive('defaultImage', defaultImage);

  function defaultImage () {
    return {
      restrict:'A',
      link: function(scope, element, attr) {
        element.on('error', function() {
          element.attr('src', attr.defaultImage);
        })
      }
    }
  }

})();
