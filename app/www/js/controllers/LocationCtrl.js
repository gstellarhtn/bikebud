angular.module('bb-app')
  .controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['$scope', '$state', '$stateParams', 'GeolocationService'];

  function LocationCtrl($scope, $state, $stateParams, GeolocationService){

    var position = GeolocationService.getDefaultPosition();

    GeolocationService.getCurrentPosition().then(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      position = {
        lat: lat,
        lng: lng
      };
    }, function (err) {
      console.error("Can't get user position!", err);
    });


    if ($stateParams.locations == null) {
      $state.go('app.city');
    }

    $scope.locations = $stateParams.locations;

    if ($scope.locations) {
      $scope.locations.forEach(function(location) {
        location.selected = false;
      });
    }

    var vm = this;
    vm.selectedDestinations = [];
    vm.createRoute = createRoute;
    vm.selectionChanged = selectionChanged;

    // Push current position
    vm.selectedDestinations.push(position);

    function createRoute(){
      $state.go('app.map', {'destinations': vm.selectedDestinations, 'city': $stateParams.city });
    }

    function selectionChanged(location){
      var coords = location.coords;
      $scope.locations[location.id - 1].selected = !$scope.locations[location.id - 1].selected;

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
