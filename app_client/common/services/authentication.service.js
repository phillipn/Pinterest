(function () {

  angular
    .module('pictureApp')
    .service('authentication', authentication);

  function authentication ($http) {

    getCurrentUser = function(){
      return $http.get('/api/user');
    }

    logout = function(){
      return $http.delete('/api/user');
    }

    return {
      getCurrentUser: getCurrentUser,
      logout: logout
    }
  }

})();
