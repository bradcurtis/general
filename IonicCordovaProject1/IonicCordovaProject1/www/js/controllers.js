angular.module('starter.controllers', [])


.controller('SignInCtrl', function ($scope, $state, UserService,$ionicPlatform) {

    var vm = this;

    $ionicPlatform.ready(function () {

        // Initialize the database.
        UserService.initDB();

        // Get all birthday records from the database.
        UserService.getAllUsers()
                        .then(function (users) {
                            vm.users = users;
                        });
    });
    
        $scope.signIn = function (user) {
            console.log('Sign-In', user);
            $scope.user = user;

   
           UserService.addUser($scope.user);

            $state.go('tab.dash');
        };

    })
.controller('DashCtrl', function ($scope, $ionicPlatform, UserService) {

    var vm = this;

    // Get all birthday records from the database.
    UserService.getAllUsers()
                    .then(function (users) {
                        vm.users = users;
                        $scope.user = users[0];
                    });
   

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('DataupdateCtrl', function ($scope, Vendors, $ionicPlatform, BirthdayService) {
    $scope.vendors = Vendors.all();

    var vm = this;

    $ionicPlatform.ready(function () {

        // Initialize the database.
        BirthdayService.initDB();

        // Get all birthday records from the database.
        BirthdayService.getAllBirthdays()
                        .then(function (birthdays) {
                            vm.birthdays = birthdays;
                        });
    });

    $scope.remove = function (vendor) {
        Vendors.remove(vendor);
    }

    $scope.datepickerObject = {
        titleLabel: 'Pick Date',  //Optional
        todayLabel: 'Today',  //Optional
        showTodayButton: 'true', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        inputDate: new Date(),    //Optional
        modalFooterColor: 'bar-positive', //Optional
        dateFormat: 'dd-MM-yyyy', //Optional
        callback: function (val) {  //Mandatory
            datePickerCallback(val);
        }
       
    };
    

    var datePickerCallback = function (val) {
        if (typeof (val) === 'undefined') {
            console.log('No date selected');
        } else {
            console.log('Selected date is : ', val)
            $scope.datepickerObject.inputDate = val;
        }
    };

    // Open our new task modal
    $scope.newTask = function () {
        var obj = {};
        obj["title"] = $scope.title;
        BirthdayService.addBirthday(obj);

        BirthdayService.getAllBirthdays()
                       .then(function (birthdays) {
                           console.log('Birthyday service' + birthdays);
                       });


        
    };

});
