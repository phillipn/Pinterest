(function () {

  angular
    .module('pictureApp')
    .controller('navbarController', navbarController);

  function navbarController(authentication) {
    var vm = this;
    vm.user = '';

    authentication.getCurrentUser()
      .success(function(data){
        console.log(data);
        vm.user = data;
      })
      .error(function(err){
        console.log(err);
      })

    vm.logout = function(){
      authentication.logout()
        .success(function(data){
          console.log(data);
          vm.user = data;
        })
        .error(function(err){
          console.log(err);
        })
    }

  }

})();
