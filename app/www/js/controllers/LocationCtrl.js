angular.module('bb-app')

  .controller('LocationCtrl', function($scope, $state) {
    $scope.createRoute = function() {
      $state.go('app.map', {});
    };
  });