angular
    .module('bb-app')
    .factory('bixiPathService', bixiPathService);

    function bixiPathService(){
        return {
            getShortestPath: getShortestPath
        };

        function getShortestPath(origin, data){
            var startingLocation = origin[0];
            var distances = [];
            var closestStation = data[0];
            _.forEach(data, function(station){
                distances.push(getHaversineDistance(startingLocation.coords.lat, startingLocation.coords.lon, station.coords.lat, station.coords.lon))
            });
            var shortestDistance = _.min(distances);
            console.log(shortestDistance);
        }

        function getHaversineDistance(lat1, lon1, lat2, lon2){
            var radiusInKM = 6371; // Earth radius is 6,371 KM
            var dlat = (lat2 - lat1) * (Math.PI / 180.0);
            var dlon = (lon2 - lon1) * (Math.PI / 180.0);
            var haversine = Math.pow(Math.sin(dlat / 2.0), 2.0) +
                Math.cos(lat1 * (Math.PI / 180.0)) *
                Math.cos(lat2 * (Math.PI / 180.0)) *
                Math.pow(Math.sin(dlon / 2.0), 2.0);
            var t = 2 * radiusInKM * Math.atan2(Math.sqrt(haversine), Math.sqrt(1.0 - haversine));
            return 2 * radiusInKM * Math.atan2(Math.sqrt(haversine), Math.sqrt(1.0 - haversine));
        }
    };