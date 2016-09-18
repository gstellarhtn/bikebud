angular.module('bb-app')

  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, bixiStationService, bixiPathService, Map) {
    var poi = [
      {
        "id": 1,
        "coords": {
          lat: 45.502737,
          lon: -73.572887
        }
      },
      {
        "id": 2,
        "coords": {
          lat: 45.501689,
          lon: -73.567256
        }
      },
      {
        "id": 3,
        "coords": {
          lat: 45.492573,
          lon: -73.618339
        }
      },
      {
        "id": 4,
        "coords": {
          lat: 45.504318,
          lon: -73.549567
        }
      }
    ];

    $scope.map = {
      center: {
        latitude: '43.653226',
        longitude: '-79.383184',
        accuracy: 0
      },
      zoom: 10,
      pan: 1,
      markersControl: {},
      options: {
        //custom styles to hide points of interest on the map
        styles: [{
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }],
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true
      }
    };
    uiGmapGoogleMapApi.then(function (maps) {

    });

    // fires when gmap is loaded
    uiGmapIsReady.promise(1).then(function (instances) {
      var inst = instances[0]; // gets the map
      bixiStationService.getTorontoBixi().then(function (data) {
        bixiPathService.getShortestPath(poi[0], data);
        Map.calculateAndDisplayRoute(inst.map, data);
      });

    });

    function calculateAndDisplayRoute(map) {

      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer({ preserveViewport: true, suppressMarkers: true });
      directionsDisplay.setMap(map);

      var waypts = [];
      // var checkboxArray = document.getElementById('waypoints');
      // for (var i = 0; i < checkboxArray.length; i++) {
      //   if (checkboxArray.options[i].selected) {
      //     waypts.push({
      //       location: checkboxArray[i].value,
      //       stopover: true
      //     });
      //   }
      // }
      waypts.push({
        location: "montreal, quebec",
        stopover: true
      });
      waypts.push({
        location: "toronto, ont",
        stopover: true
      });

      directionsService.route({
        // origin: document.getElementById('start').value,
        // destination: document.getElementById('end').value,
        origin: "Halifax, NS",
        destination: "Vancouver, BC",
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'BICYCLING'
      }, function (response, status) {
        if (status === 'OK') {

          directionsDisplay.setMap(map)
          directionsDisplay.setDirections(response);
          // var route = response.routes[0];

          // var summaryPanel = document.getElementById('directions-panel');
          // summaryPanel.innerHTML = '';
          // // For each route, display summary information.
          // for (var i = 0; i < route.legs.length; i++) {
          //   var routeSegment = i + 1;
          //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
          //       '</b><br>';
          //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          // }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  })