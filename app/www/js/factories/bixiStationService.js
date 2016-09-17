angular
    .module('bb-app')
    .factory('bixiStationService', bixiStationService);

    bixiStationService.$inject = ['$http'];

    function bixiStationService($http){
        return {
            getMontrealBixi: getMontrealBixi,
            getTorontoBixi: getTorontoBixi
        };

        function getMontrealBixi(){
            return $http.get('https://api-core.bixi.com/gbfs/en/station_information.json')
                .then(getMontrealSuccess)
                .catch(getMontrealFailed)

            function getMontrealSuccess(response){
                var bixiStations = _.map(response.data.data.stations, function(station){
                    return translateBixiData(station);
                });
                return bixiStations;
            }

            function getMontrealFailed(error){
                console.log(error);
            }
        }

        function getTorontoBixi(){
            return $http.get('https://feeds.bikesharetoronto.com/stations/stations.json')
                .then(getTorontoSuccess)
                .catch(getTorontoFailed)

            function getTorontoSuccess(response){
                console.log(response);
            }

            function getTorontoFailed(error){
                console.log(error);
            }
        }

        function translateBixiData(data){
            var result = {
                id : 0,
                longitude : 0,
                latitude : 0
            };
            if(data["station_id"])
                result.id = data["station_id"];
            if(data["lat"])
                result.latitude = data["lat"];
            if(data["lon"])
                result.longitude = data["lon"];
            
            return result;
        }
    }