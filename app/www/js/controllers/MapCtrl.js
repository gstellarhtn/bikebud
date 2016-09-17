angular.module('bb-app')

  .controller('MapCtrl', function($scope, uiGmapGoogleMapApi, bixiStationService) {

    $scope.map = {
      center: {
        latitude: '45.5085',
        longitude: '-73.5797',
        accuracy: 0
      },
      zoom: 14,
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
        zoomControl: false
      }
    };

    bixiStationService.getMontrealBixi();
    
    // $scope.marker = {
    //   id: 0,
    //   options: {draggable: false},
    //   events: {
    //     click: function (marker) {
    //       var markerCount = Map.getUserRoute().coordinates.length;
    //       if (markerCount < 2) {
    //         var lat = marker.getPosition().lat();
    //         var lon = marker.getPosition().lng();
    //         marker.setVisible(false);
    //         Map.addMarker(new google.maps.LatLng(lat, lon));
    //       }
    //
    //     }
    //   }
    // };

    uiGmapGoogleMapApi.then(function(maps) {
      console.log('Google Maps loaded');
    });

  })