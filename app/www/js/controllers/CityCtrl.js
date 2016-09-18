angular.module('bb-app')

  .controller('CityCtrl', function($scope, $state) {

    var montrealLocations = [
      {
        id: 1,
        name: 'St-Joseph Oratory',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 2,
        name: 'Olympic Stadium',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 3,
        name: 'McGill University',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 4,
        name: 'Old Port Montreal',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 5,
        name: 'Orange Julep',
        location: {
          lat: '',
          lng: ''
        }
      }
    ];

    var torontoLocation = [
      {
        id: 1,
        name: 'CN Tower',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 2,
        name: 'Casa Loma',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 3,
        name: 'Rogers Center',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 4,
        name: 'Cherry Beach',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 5,
        name: 'Distellery District',
        location: {
          lat: '',
          lng: ''
        }
      },
      {
        id: 6,
        name: 'China town',
        location: {
          lat: '',
          lng: ''
        }
      }
    ];

    $scope.chooseCity = function(city) {

      var locations = null;

      if (city == "Montreal") {
        locations = montrealLocations;
      } else if (city == "Toronto") {
        locations = torontoLocation;
      } else if (city == "Vancouver") {
        locations = null; // TO-DO
      }

      if (locations == null) {
        $state.go('app');
      } else {
        $state.go('app.location', {'locations': locations});
      }

    };

  });