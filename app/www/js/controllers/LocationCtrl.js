angular.module('bb-app')
  .controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = [];

  function LocationCtrl(){
    var vm = this;
    vm.selectedDestinations = [];
    vm.createRoute = createRoute;
    vm.selectionChanged = selectionChanged;

    function createRoute(){

    }

    function selectionChanged(obj){
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