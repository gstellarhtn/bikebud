(function() {
  'use strict';

  angular
    .module('bb-app')
    .factory('Map', Map);

  /**
   * A factory that take care of all google map interactions
   * @param $state
   * @param $q
   * @param $log
   * @returns {{init: init, addMarker: addMarker, addRoutes: addRoutes, addCircles: addCircles, clearAvailableRoutes: clearAvailableRoutes, clearAllRoutes: clearAllRoutes, dispDirections: dispDirections, geocodeLocation: geocodeLocation, getUserRoute: getUserRoute, isLoadedFn: isLoadedFn, setLoaded: setLoaded}}
   * @constructor
   */
  function Map($state, $q, $log) {
    // Public API
    var Map = {
      calculateAndDisplayRoute: calculateAndDisplayRoute
    };

    return Map;

    function calculateAndDisplayRoute(map, data) {

      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true, suppressMarkers: true});
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
      }, function(response, status) {
        if (status === 'OK') {

          directionsDisplay.setMap(map)
          directionsDisplay.setDirections(response);

          var marker = new google.maps.Marker({
            map: map,
            icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + 'A' + "|" + 'FFFFFF' + "|000000",
            position: new google.maps.LatLng(44.648862, -63.575320)
          });

          var marker = new google.maps.Marker({
            map: map,
            icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + 'B' + "|" + 'FFFFFF' + "|000000",
            position: new google.maps.LatLng(49.282729, -123.120738)
          });

          var marker = new google.maps.Marker({
            map: map,
            icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + 'B' + "|" + 'FFFFFF' + "|000000",
            position: new google.maps.LatLng(45.501689, -73.567256)
          });

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

  }

})();