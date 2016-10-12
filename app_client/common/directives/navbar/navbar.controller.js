(function () {

  angular
    .module('pictureApp')
    .controller('navbarController', navbarController);

  function navbarController($window) {
    var vm = this;

    vm.user = window.user;
    console.log(vm.user);

  }

})();
