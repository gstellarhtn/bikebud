angular.module('bb-app')

  .controller('LoginCtrl', function($scope, $state, $http) {
  	
  	$scope.loginData = {};

    $scope.login = function() {
    	$http.post('http://localhost:80/login', $scope.loginData, {}).then(function(response) {
    		console.log("Login");
    	}).catch(function(error) {
    		console.log(error);
    	});
    }

    $scope.register = function() {    
    	$http.post('http://localhost:80/register', $scope.loginData, {}).then(function(response) {
    		console.log("Register");
    	}).catch(function(error) {
    		console.log(error);
    	});
    };

  });