angular.module('bb-app')

  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, bixiStationService, bixiPathService, Map, $stateParams, $state) {
    // if($stateParams.city == null){
    //   $state.go('app.location');
    // }
    $scope.city = $stateParams.city;

    $scope.map = {
      center: {
        latitude: '43.653226',
        longitude: '-79.383184'
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

    uiGmapGoogleMapApi.then(function () {
      $scope.map = {
        center: {
          latitude: '43.653226',
          longitude: '-79.383184'
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
    });

    // fires when gmap is loaded
    uiGmapIsReady.promise(1).then(function (instances) {
      var inst = instances[0]; // gets the map
      var pathWaypoints = [];
      console.log($scope.city);
      if ($scope.city === 'Montreal'){
        bixiStationService.getMontrealBixi().then(function (data) {
          console.log("hai");
          pathWaypoints = getBixiWaypoints($stateParams.destinations, data);
          Map.calculateAndDisplayRoute(inst.map, data);
        });
      } else {
        bixiStationService.getTorontoBixi().then(function (data) {
          pathWaypoints = getBixiWaypoints($stateParams.destinations, data);
          Map.calculateAndDisplayRoute(inst.map, data);
        });
      }

    });

    function getBixiWaypoints(destinations, stations){
      var result = []
      _.forEach(destinations, function(destination){
        result.push(bixiPathService.getShortestPath(destination, stations));
      });
      console.log(result);
      return result; // coords of each bixi station nearby each destination of the route
    }
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