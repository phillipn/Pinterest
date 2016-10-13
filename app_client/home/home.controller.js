(function(){

  angular
    .module('pictureApp')
    .controller('homeController', homeController);

  function homeController(authentication, pictureData){
    var vm = this;

    vm.selectedIndex = -1; // Whatever the default selected index is, use -1 for no selection

    vm.allPicsLinkEmph = true;
    vm.userPicsLinkEmph = false;

    vm.emphasize = function(input){
      if(input === 'allPicsLink'){
        vm.allPicsLinkEmph = true;
        vm.userPicsLinkEmph = false;
      } else {
        vm.allPicsLinkEmph = false;
        vm.userPicsLinkEmph = true;
      }
    }

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
          vm.userPictures = [];
          vm.pictures = data;
        })
        .error(function(err){
          console.log(err);
        })
    }
    vm.getAllPics();

    vm.getUserPics = function(userName){
      pictureData.getUserPics(userName)
        .success(function(data){
          vm.pictures = [];
          vm.userPictures = data;
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

    vm.userLikes = function(picture){
      if((picture.likes).indexOf(vm.user.twitter.displayName) !== -1){
        return true;
      } else {
        return false;
      }
    }

    vm.toggleLikes = function(picture, index){
      console.log((picture.likes).indexOf(vm.user.twitter.displayName));
      if((picture.likes).indexOf(vm.user.twitter.displayName) !== -1){
        picture.likes.length -= 1;
        var likeObj = {like: false};
      } else {
        picture.likes.length += 1;
        var likeObj = {like: true};
      }

      pictureData.toggleLikes(picture._id, likeObj)
        .success(function(data){
          vm.pictures[index] = data;
        })
        .error(function(err){
          console.log(err);
        })
    }

    vm.deletePicture = function(pictureId, index){
      console.log(index);
      pictureData.deletePicture(pictureId)
        .success(function(data){
          vm.userPictures[index] = data;
        })
        .error(function(err){
          console.log(err);
        })
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
