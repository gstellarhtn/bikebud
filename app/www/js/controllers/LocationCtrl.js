angular.module('bb-app')
  .controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['$scope', '$state', '$stateParams'];

  function LocationCtrl($scope, $state, $stateParams){

    if ($stateParams.locations == null) {
      $state.go('app.city');
    }

    $scope.locations = $stateParams.locations;

    var vm = this;
    vm.selectedDestinations = [];
    vm.createRoute = createRoute;
    vm.selectionChanged = selectionChanged;

    function createRoute(){
      //$state.go('app.map', {});
    }

    function selectionChanged(obj){

      console.log(obj.target);

      var destinationData = obj.target.attributes.data.value;
      if(!_.includes(vm.selectedDestinations, destinationData)){
        vm.selectedDestinations.push(destinationData);
      } else{
        _.remove(vm.selectedDestinations, function(n) {
          return n === destinationData;
        });
      }
      console.log(vm.selectedDestinations);
    }

  }
