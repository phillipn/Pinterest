(function(){

  angular
    .module('pictureApp')
    .controller('homeController', homeController);

  function homeController(authentication, pictureData){
    var vm = this;

    vm.user = '';

    vm.formData = {};

    vm.brokenLink = false;

    vm.removeAlerts = function(){
      vm.imageError = false;
      vm.imageSent = false;
    }

    vm.getAllPics = function(){
      pictureData.getAllPics()
        .success(function(data){
          vm.pictures = data;
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
        vm.imageError = "Please enter a title and image url";
      } else {
        if(vm.brokenLink){
          formData.image_url = "http://www.novelupdates.com/img/noimagefound.jpg";
        }
        pictureData.postPic(formData)
          .success(function(data){
            vm.pictures.push(data);
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

    authentication.getCurrentUser()
      .success(function(data){
        vm.user = data;
      })
      .error(function(err){
        console.log(err);
      })
  }
})();
