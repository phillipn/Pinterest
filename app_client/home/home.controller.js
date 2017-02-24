(function(){

  angular
    .module('pictureApp')
    .controller('homeController', homeController);

  function homeController(authentication, pictureData){
    var vm = this;
    vm.onError = function(){
      console.log('error');
    }
    vm.emphasize = function(input){
      if(input === 'allPicsLink'){
        vm.allPicsLinkEmph = true;
        vm.userPicsLinkEmph = false;
      } else {
        vm.allPicsLinkEmph = false;
        vm.userPicsLinkEmph = true;
      }
    }

    vm.removeAlerts = function(){
      vm.imageError = false;
      vm.imageSent = false;
    }

    vm.getAllPics = function(){
      vm.allPics = true;
      vm.userPics = false;
      pictureData.getAllPics()
        .then(function(response){
          vm.userPictures = [];
          vm.pictures = response.data;
        })
        .catch(function(response){
          console.log(response.data);
        })
    }

    vm.getUserPics = function(userName){
      vm.allPics = false;
      vm.userPics = true;
      pictureData.getUserPics(userName)
        .then(function(response){
          vm.pictures = [];
          vm.userPictures = response.data;
        })
        .catch(function(response){
          console.log(response.data);
        });
    }

    vm.postPic = function(formData){
      console.log('vm.postPic entered');
      if(!formData.image_url || !formData.title){
        console.log('no formData');
        vm.imageSent = false;
        vm.imageError = "Please enter a title and image url";
        return false;
      } else {
        if(vm.brokenLink){
          formData.image_url = "http://www.novelupdates.com/img/noimagefound.jpg";
        }
        pictureData.postPic(formData)
          .then(function(response){
            vm.pictures.push(response.data);
            vm.userPictures.push(response.data);
            vm.formData = {};
            vm.imageError = false;
            vm.imageSent = "Image submitted";
          })
          .catch(function(response){
            console.log(response.data);
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
      if((picture.likes).indexOf(vm.user.twitter.displayName) !== -1){
        picture.likes.length -= 1;
        var likeObj = {like: false};
      } else {
        picture.likes.length += 1;
        var likeObj = {like: true};
      }

      pictureData.toggleLikes(picture._id, likeObj)
        .then(function(response){
          vm.pictures[index] = response.data;
        })
        .catch(function(response){
          console.log(response.data);
        })
    }

    vm.deletePicture = function(pictureId, index){
      pictureData.deletePicture(pictureId)
        .then(function(response){
          vm.userPictures[index] = response.data;
        })
        .catch(function(response){
          console.log(response.data);
        })
    }

    vm.logout = function(){
      authentication.logout()
        .then(function(response){
          vm.user = response.data;
          vm.getAllPics();
        })
        .catch(function(response){
          console.log(response.data);
        })
    }

    vm.init = function(){
      console.log('called');
      vm.selectedIndex = -1; // Whatever the default selected index is, use -1 for no selection
      vm.allPicsLinkEmph = true;
      vm.userPicsLinkEmph = false;
      vm.user = '';
      vm.formData = {};
      vm.allPics = true;
      vm.pictures = [];
      vm.userPictures = [];
      vm.getAllPics();
      authentication.getCurrentUser()
        .then(function(response){
          vm.user = response.data;
        }, function(response){
          console.log(response.data);
        })
      }

      vm.init();
  }
})();
