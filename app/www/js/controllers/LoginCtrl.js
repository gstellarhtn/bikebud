angular.module('bb-app')

  .controller('LoginCtrl', function($scope, $state, $http) {
  	
  	$scope.loginData = {};

    $scope.login = function() {
    	$http.post('http://173.255.116.51:3000/login', $scope.loginData, {}).then(function(response) {
    		console.log("Login");
    		$state.go('app.location', {});
    	}).catch(function(error) {
    		console.log(error);
    	});
    }

    $scope.register = function() {    
    	$http.post('http://173.255.116.51:3000/register', $scope.loginData, {}).then(function(response) {
    		console.log("Register");
    		$state.go('app.location', {});
    	}).catch(function(error) {
    		console.log(error);
    	});
    };

  });