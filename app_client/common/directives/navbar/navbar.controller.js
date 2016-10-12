(function () {

  angular
    .module('pictureApp')
    .controller('navbarController', navbarController);

  function navbarController(authentication, pictureData) {
    var vm = this;

    vm.user = '';

    vm.formData = {};

    vm.pics = [];

    vm.removeAlerts = function(){
      vm.imageError = false;
      vm.imageSent = false;
    }

    authentication.getCurrentUser()
      .success(function(data){
        console.log(data);
        vm.user = data;
      })
      .error(function(err){
        console.log(err);
      })

    vm.getAllPics = function(){
      pictureData.getAllPics()
        .success(function(data){
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        })
    }

    vm.getUserPics = function(userName){
      pictureData.getUserPics(userName)
        .success(function(data){
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        })
    }

    vm.postPic = function(formData){
      if(!formData.image_url || !formData.title){
        vm.imageSent = false;
        vm.imageError = "Please enter a title and image_url";
      } else {
        pictureData.postPic(formData)
          .success(function(data){
            console.log(data);
            vm.formData = {};
            vm.imageError = false;
            vm.imageSent = "Image submitted";
          })
          .error(function(err){
            console.log(err);
        })
      }
    }

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
