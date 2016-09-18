angular.module('bb-app')
  .controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['$scope', '$state', '$stateParams'];

  function LocationCtrl($scope, $state, $stateParams){

    if ($stateParams.locations == null) {
      $state.go('app.city');
    }

    $scope.locations = $stateParams.locations;

    if ($scope.locations) {
      $scope.locations.forEach(function(location) {
        location.selected = false;
      });
    }

    console.log($scope.locations);

    var vm = this;
    vm.selectedDestinations = [];
    vm.createRoute = createRoute;
    vm.selectionChanged = selectionChanged;

    function createRoute(){
      $state.go('app.map', {});
    }

    function selectionChanged(location){
      var coords = location.coords;
      $scope.locations[location.id - 1].selected = !$scope.locations[location.id - 1].selected;
      console.log($scope.locations);

      if(!_.includes(vm.selectedDestinations, coords)){
        vm.selectedDestinations.push(coords);
      } else{
        _.remove(vm.selectedDestinations, function(n) {
          return n === coords;
        });
      }
      console.log(vm.selectedDestinations);
    }

  }
