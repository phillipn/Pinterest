(function () {

  angular
    .module('pictureApp')
    .service('pictureData', pictureData);

  function pictureData ($http) {

    getAllPics = function(){
      return $http.get('/api/pictures');
    }

    getUserPics = function(userName){
      return $http.get('/api/pictures/' + userName);
    }

    postPic = function(formData){
      return $http.post('/api/pictures/', formData);
    }

    return {
      getAllPics: getAllPics,
      getUserPics: getUserPics,
      postPic: postPic
    }
  }

})();
