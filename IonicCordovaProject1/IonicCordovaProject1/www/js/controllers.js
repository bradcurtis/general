angular.module('starter.controllers', [])



.controller('DashCtrl', function ($scope) {

    // Called when the form is submitted
    $scope.logIn = function (user) {
        $scope.loggedinuser = user;
    };
    

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
.controller('DataupdateCtrl', function ($scope, Vendors) {
    $scope.vendors = Vendors.all();
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

});
