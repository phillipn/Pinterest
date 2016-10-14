(function(){
  angular
    .module('pictureApp')
    .filter('likeFilter', likeFilter);

  function likeFilter(){
    return function(number){
      if(number>1 || number === 0){
        return number + ' likes';
      } else {
        return number + ' like';
      }
    }
  }
})();
