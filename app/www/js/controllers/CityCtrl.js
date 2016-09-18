angular.module('bb-app')

  .controller('CityCtrl', function($scope, $state) {

    var montrealLocations = [
      {
        id: 1,
        name: 'St-Joseph Oratory',
        class: 'st-joseph',
        coords: {
          lat: 45.492,
          lng: -73.618
        }
      },
      {
        id: 2,
        name: 'Olympic Stadium',
        class: 'olympic-stadium',
        coords: {
          lat: 45.558,
          lng: -73.552
        }
      },
      {
        id: 3,
        name: 'McGill University',
        class: 'mcgill',
        coords: {
          lat: 45.5048,
          lng: -73.5772
        }
      },
      {
        id: 4,
        name: 'Old Port Montreal',
        class: 'oldport',
        coords: {
          lat: 45.512,
          lng: -73.548
        }
      },
      {
        id: 5,
        name: 'Orange Julep',
        class: 'julep',
        coords: {
          lat: 45.495,
          lng: -73.656
        }
      },
      {
        id: 6,
        name: 'Mont-Royal',
        class: 'mont-royal',
        coords: {
          lat: 45.495,
          lng: -73.656
        }
      }
    ];

    var torontoLocation = [
      {
        id: 1,
        name: 'CN Tower',
        class: 'cn-tower',
        coords: {
          lat: '43.643',
          lng: '-79.387'
        }
      },
      {
        id: 2,
        name: 'Casa Loma',
        class: 'casa-loma',
        coords: {
          lat: '43.678',
          lng: '-79.410'
        }
      },
      {
        id: 3,
        name: 'Rogers Centre',
        class: 'rogers-center',
        coords: {
          lat: '43.642',
          lng: '-79.389'
        }
      },
      {
        id: 4,
        name: 'Cherry Beach',
        class: 'beach',
        coords: {
          lat: '43.638',
          lng: '-79.342'
        }
      },
      {
        id: 5,
        name: 'Distillery District',
        class: 'distillery',
        coords: {
          lat: '43.650',
          lng: '-79.360'
        }
      },
      {
        id: 6,
        name: 'Chinatown',
        class: 'chinatown',
        coords: {
          lat: '43.651',
          lng: '-79.398'
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
        $state.go('app.location', {'locations': locations, 'city': city});
      }

    };

  });