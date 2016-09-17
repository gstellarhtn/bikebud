angular.module('bb-app')

  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, uiGmapIsReady, bixiStationService, Map) {




    $scope.map = {
      center: {
        latitude: '45.5085',
        longitude: '-73.5797',
        accuracy: 0
      },
      zoom: 6,
      pan: 1,
      markersControl: {},
      options: {
        //custom styles to hide points of interest on the map
        styles: [{
          featureType: "poi",
          elementType: "labels",
          stylers: [{visibility: "off"}]
        }],
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true
      }
    };
    uiGmapGoogleMapApi.then(function(maps) {

    });

    // fires when gmap is loaded
    uiGmapIsReady.promise(1).then(function (instances) {
       var inst = instances[0]; // gets the map
        bixiStationService.getTorontoBixi().then(function(data) {
          Map.calculateAndDisplayRoute(inst.map, data);
        });

     });
  })