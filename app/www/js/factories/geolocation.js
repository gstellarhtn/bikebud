angular.module('bb-app')

.service('GeolocationService', function($q, $ionicPlatform, $http, $cordovaGeolocation) {

  var lat, lon;

  var lastPosition = JSON.parse(window.localStorage['lastPosition'] || null);

  if (lastPosition) {
    lat = lastPosition.lat;
    lon = lastPosition.lon;
  } else {
    lat = '43.472334';
    lon = '-80.546139';
  }

  var fallbackPositionObject = {
    latitude: lat,
    longitude: lon,
    accuracy: 0
  };

  this.isLocationEnabled = function () {
    $ionicPlatform.ready(function () {
      if (window.cordova && cordova.plugins.diagnostic) {
        cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
          return enabled;
        }, function (error) {
          console.error("The following error occurred: " + error);
        });
      } else {
        console.log('Cordova not available');
      }
    });
  };

  this.getCurrentPosition = function (options) {
    var defer = $q.defer();
    options = options || {
      timeout: 10000,
      maximumAge: 0,
      enableHighAccuracy: false
    };

    $ionicPlatform.ready(function () {

      $cordovaGeolocation
      .getCurrentPosition(options)
      .then(
        function (position) {
          console.log('Got geolocation');
          window.localStorage['lastPosition'] = JSON.stringify({'lat': position.coords.latitude, 'lon': position.coords.longitude});
          defer.resolve(position);
        },
        function (locationError) {
          console.log('Did not get geolocation');
          defer.reject({
            code: locationError.code,
            message: locationError.message,
            coords: fallbackPositionObject
          });
        }
      );
    });

    return defer.promise;
  };

  /**
   * Convert any address to a latitude/longitude object.
   * @param strAddress The address as a string, e.g. 'Willemstad, Curaçao'
   * @returns {*}
   */
   this.addressToPosition = function (strAddress) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + strAddress + '&sensor=false')
    .then(
      function (result) {
        var location = result.data.results[0].geometry.location;
        // Transforming the 'location.lat' and 'location.lng' object to 'location.latitude' to be
        // compatible with other location responses like in getCurrentPosition
        return {
          latitude: location.lat,
          longitude: location.lng
        };
      },
      function (reason) {
        return $q.reject(reason);
      }
    );
  };

  this.getDefaultPosition = function () {
    return fallbackPositionObject;
  };

  return this;
});