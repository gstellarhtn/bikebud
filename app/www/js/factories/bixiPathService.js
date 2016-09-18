angular
    .module('bb-app')
    .factory('bixiPathService', bixiPathService);

    function bixiPathService(){
        return {
            getShortestPath: getShortestPath
        };

        function getShortestPath(origin, data){
            var startingLocation = origin;
            var closestStation = data[0];
            var closestStationDistance = getHaversineDistance(startingLocation.lat, startingLocation.lng, data[0].coords.lat, data[0].coords.lon);
            _.forEach(data, function(station){
                if(closestStationDistance > getHaversineDistance(startingLocation.lat, startingLocation.lng, station.coords.lat, station.coords.lon)){
                    closestStationDistance = getHaversineDistance(startingLocation.lat, startingLocation.lng, station.coords.lat, station.coords.lon);
                    closestStation = station;
                }
            });
            return closestStation;
        }

        function getHaversineDistance(lat1, lon1, lat2, lon2){
            var radiusInKM = 6371; // Earth radius is 6,371 KM
            var dlat = (lat2 - lat1) * (Math.PI / 180.0);
            var dlon = (lon2 - lon1) * (Math.PI / 180.0);
            var haversine = Math.pow(Math.sin(dlat / 2.0), 2.0) +
                Math.cos(lat1 * (Math.PI / 180.0)) *
                Math.cos(lat2 * (Math.PI / 180.0)) *
                Math.pow(Math.sin(dlon / 2.0), 2.0);
            return 2 * radiusInKM * Math.atan2(Math.sqrt(haversine), Math.sqrt(1.0 - haversine));
        }
    };