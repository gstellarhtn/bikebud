angular.module('bb-app')

  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, bixiStationService, bixiPathService, Map, $stateParams, $state, GeolocationService) {
    // if($stateParams.city == null){
    //   $state.go('app.location');
    // }
    var position = GeolocationService.getDefaultPosition();

    GeolocationService.getCurrentPosition().then(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      position = {
        lat: lat,
        lng: lng
      };
    }, function (err) {
      console.warn("Can't get user position!", err);
    });

    console.log(position);

    $scope.city = $stateParams.city;

    $scope.map = {
      center: position,
      zoom: 10,
      pan: 1,
      markersControl: {},
      options: {
        //custom styles to hide points of interest on the map
        styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}],
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
      //TODO add waypoint of closest station

      var inst = instances[0]; // gets the map
      var pathWaypoints = [];
      console.log($scope.city);
      if ($scope.city === 'Montreal'){
        bixiStationService.getMontrealBixi().then(function (data) {
          pathWaypoints = getBixiWaypoints($stateParams.destinations, data);
          calculateAndDisplayRoute(inst.map, pathWaypoints);
        });
      } else {
        bixiStationService.getTorontoBixi().then(function (data) {
          pathWaypoints = getBixiWaypoints($stateParams.destinations, data);
          calculateAndDisplayRoute(inst.map, pathWaypoints);
        });
      }

    });

    function getBixiWaypoints(destinations, stations){
      var result = []
      _.forEach(destinations, function(destination){
        result.push(bixiPathService.getShortestPath(destination, stations));
      });
      return result; // coords of each bixi station nearby each destination of the route
    }
    function calculateAndDisplayRoute(map, pathWaypoints) {
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
      _.forEach(pathWaypoints, function(wp){
        var loc = wp.coords["lat"].toString() + "," + wp.coords["lon"].toString();
          waypts.push({
          location: loc,
          stopover: true
          });
      });
      if (pathWaypoints == null) {
        return;
      }
      var dest = bixiPathService.getLongestPath(position, pathWaypoints);
      directionsService.route({
        origin: position["latitude"].toString() + ", " + position["longitude"].toString(),
        destination: dest.coords["lat"].toString() + ", " + dest.coords["lon"].toString(),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'BICYCLING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setMap(map)
          directionsDisplay.setDirections(response);
          // var route = response.routes[0];

          console.log("HEYYY", pathWaypoints);

          // hackzzz
          var points = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

          for (var i = 0; i < pathWaypoints.length - 1; i++) {
            var marker = new google.maps.Marker({
              map: map,
              //icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + 'B' + "|" + 'FFFFFF' + "|000000",
              position: new google.maps.LatLng(pathWaypoints[i].coords.lat, pathWaypoints[i].coords.lon),
              //label: points[i]
            });
          }




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